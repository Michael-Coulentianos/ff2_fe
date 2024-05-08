import React, { useState, useEffect } from "react";
import { Grid, Button, Divider } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import DynamicTable from "../organisms/table";
import {
  getNotes,
  deleteNote,
  createNote,
  updateNote,
  getOrganizations,
  getNoteTypes
} from "../../apiService";
import NotesDialog from "../organisms/notesDialog";
import GenericConfirmDialog from "../organisms/genericConfirmDialog";
import moment from 'moment';
import DynamicChip from "../atom/dynamicChip";

interface DataItem {
  id: string;
  [key: string]: any;
}

interface ColumnConfig {
  label: string;
  dataKey: keyof DataItem;
  renderCell: (item: DataItem) => React.ReactNode;
}

interface LocationState {
  latitude: number | null;
  longitude: number | null;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [noteTypes, setNoteTypes] = useState<any[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [location, setLocation] = useState<LocationState>({ latitude: null, longitude: null });
  const [error, setError] = useState('');

  function useFetchData(fetchFunction, setData, setIsLoading) {
    useEffect(() => {
      async function fetchData() {
        setIsLoading(true);
        try {
          const data = await fetchFunction();
          setData(data);
        } catch (error) {
          console.error(
            `Error fetching data from ${fetchFunction.name}:`,
            error
          );
        } finally {
          setIsLoading(false);
        }
      }

      fetchData();
    }, [fetchFunction, setData, setIsLoading]);
  }

  useFetchData(getNotes, setNotes, setIsLoading);
  useFetchData(getNoteTypes, setNoteTypes, setIsLoading);
  useFetchData(getOrganizations, setOrganizations, setIsLoading);

  const getLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      () => {
        setError('Unable to retrieve your location');
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const handleOpenForm = () => {
    setFormOpen(true);
    setSelectedNote(null);
  };

  const handleCloseForm = () => {
    setSelectedNote(null);
    setFormOpen(false);
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setFormOpen(true);
  };

  const handleDelete = (note) => {
    setSelectedNote(note);
    setConfirmOpen(true);
  };

  const addPropertyIfNotEmpty = (obj, key, value) => {
    if (value !== null && value !== "" && value !== undefined) {
        obj[key] = value;
    }
};

  const handleSubmit = async (formData: any) => {

    formData.partyId = organizations.find(org => org.name === formData.party)?.partyId;
    formData.noteTypeId = noteTypes.find(nt => nt.name === formData.noteType)?.noteTypeId;

    const currentDate = new Date();

    // Extract individual components of the date
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    const seconds = String(currentDate.getSeconds()).padStart(2, '0');
    const milliseconds = String(currentDate.getMilliseconds()).padStart(7, '0');

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;

    formData.createdDate = formattedDate;

    const properties = {};
    addPropertyIfNotEmpty(properties, 'severityType', formData.severityType);
    addPropertyIfNotEmpty(properties, 'severitySubType', formData.severitySubType);
    addPropertyIfNotEmpty(properties, 'cropType', formData.cropType);
    addPropertyIfNotEmpty(properties, 'yieldEstimateHeads', formData.yieldEstimateHeads);
    addPropertyIfNotEmpty(properties, 'yieldEstimateRowWidth', formData.yieldEstimateRowWidth);
    addPropertyIfNotEmpty(properties, 'yieldEstimateGrams', formData.yieldEstimateGrams);
    addPropertyIfNotEmpty(properties, 'cropAnalysisType', formData.cropAnalysisType);
    addPropertyIfNotEmpty(properties, 'cropSubType', formData.cropSubType);
    addPropertyIfNotEmpty(properties, 'severityScale', formData.severityScale);

    if (selectedNote) {
      try {
        formData.property = JSON.stringify(properties);
        await updateNote(formData);
        const updatedNotes = notes.filter(note => note.noteId !== formData.noteId);
        setNotes([...updatedNotes, formData]);
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      try {
        formData.property = JSON.stringify(properties);
        await createNote(formData);
        setNotes([...notes, formData]);
      } catch (error) {
        console.error("Error creating note:", error);
      }
    }
    setIsLoading(false);
    handleCloseForm();
  };

  const handleConfirm = async () => {
    if (selectedNote) {
      setIsLoading(true);
      try {
        await deleteNote(selectedNote.noteId);
        setNotes(
          notes.filter((note) => note.noteId !== selectedNote.noteId)
        );
      } catch (error) {
        console.error("Failed to delete organization:", error);
      }
      setConfirmOpen(false);
      handleCloseForm();
    }
  };

  const myColumns: ColumnConfig[] = [
    {
      label: "Owner",
      dataKey: "owner",
      renderCell: (item) => <span>{item.party}</span>,
    },
    {
      label: "Title",
      dataKey: "title",
      renderCell: (item) => <span>{item.title}</span>,
    },
    {
      label: "Location",
      dataKey: "location",
      renderCell: (item) => <span>{item.location}</span>,
    },
    {
      label: "Description",
      dataKey: "description",
      renderCell: (item) => <span>{item.description}</span>,
    },
    {
      label: "Type",
      dataKey: "noteType",
      renderCell: (item) => <DynamicChip name={item.noteType} noteTypes={noteTypes} />,
    },
    {
      label: "Date",
      dataKey: "date",
      renderCell: (item) => <span>
        <p>Date: {moment(item.createdDate).format('DD MMMM YYYY')}</p>
        <p>Time: {moment(item.createdDate).format('HH:mm')}</p>
        </span>,
    },
    {
      label: "Action Buttons",
      dataKey: "actionBtns",
      renderCell: (item) => (
        <ActionButtons
          onEdit={() => handleEdit(item)}
          onDelete={() => handleDelete(item)}
        ></ActionButtons>
      ),
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} >
          <h1 className="title">Notes</h1>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleOpenForm} color="primary">
            Add Note
          </Button>
          <NotesDialog
            isOpen={formOpen}
            onClose={handleCloseForm}
            onSubmit={handleSubmit}
            formData={selectedNote}
            noteTypes={noteTypes}
            organizations={organizations}
          />
        </Grid>
        <Grid item xs={12}>
          <DynamicTable data={notes} columns={myColumns} rowsPerPage={5} />
          <GenericConfirmDialog
            open={confirmOpen}
            onCancel={() => setConfirmOpen(false)}
            onConfirm={handleConfirm}
            title="Confirm Deletion"
            content="Are you sure you want to delete this note?"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Notes;
