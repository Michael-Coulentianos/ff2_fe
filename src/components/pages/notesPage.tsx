import React, { useState, useEffect } from "react";
import { Grid, Button } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import DynamicTable from "../organisms/table";
import {
  getNotes,
  deleteNote,
  createNote,
  updateNote,
  getNoteById,
} from "../../apiService";
import NotesDialog from "../organisms/notesDialog";
import GenericConfirmDialog from "../organisms/genericConfirmDialog";
import ColoredRadio from "../molecules/ColoredRadio";

interface DataItem {
  id: string;
  [key: string]: any;
}

interface ColumnConfig {
  label: string;
  dataKey: keyof DataItem;
  renderCell: (item: DataItem) => React.ReactNode;
}

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error: any) {
        console.error("Error fetching Notes:", error.message);
      }
    };

    fetchNotes();
  }, []);

  const handleCancel = () => {
    setConfirmOpen(false);
    setCurrentNoteId(null);
  };

  const handleEditClick = async (id) => {
    try {
      const note = await getNoteById(id);
      setSelectedNote(note[0]);
      setFormOpen(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpenForm = () => {
    setFormOpen(true);
    setSelectedNote(null);
  };

  const handleCloseForm = () => {
    setFormOpen(false);
    setSelectedNote(null);
  };

  const handleFormSubmit = async (formData) => {
    console.log(formData, "formData");

    if (selectedNote) {
      console.log(selectedNote, "selectedNote");

      try {
        const updatedNote = await updateNote(formData);
        setNotes(
          notes.map((note) =>
            note.noteId === updatedNote.details ? updatedNote : note
          )
        );
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      try {
        console.log(formData, "new note?");
        const newNote = await createNote(formData);
        setNotes([...notes, newNote]);
      } catch (error) {
        console.error("Error creating note:", error);
      }
    }
    setConfirmOpen(false);
    setCurrentNoteId(null);
    handleCloseForm();
  };

  const handleDeleteClick = (noteId: number) => {
    setCurrentNoteId(noteId);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    if (currentNoteId !== null) {
      try {
        await deleteNote(currentNoteId);
        setNotes((prevNotes) =>
          prevNotes.filter((note) => note.noteId !== currentNoteId)
        );
      } catch (error) {
        console.error("Failed to delete note:", error);
      }
    }
    setConfirmOpen(false);
    setCurrentNoteId(null);
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
      label: "Date Created ",
      dataKey: "date",
      renderCell: (item) => <span>{item.createdDate}</span>,
    },
    {
      label: "Action Buttons",
      dataKey: "actionBtns",
      renderCell: (item) => (
        <ActionButtons
          onEdit={() => handleEditClick(item?.noteId)}
          onDelete={() => handleDeleteClick(item?.noteId)}
        ></ActionButtons>
      ),
    },
  ];

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Button variant="contained" onClick={handleOpenForm} color="primary">
            Add Note
          </Button>
          <NotesDialog
            isOpen={formOpen}
            onClose={handleCloseForm}
            onSubmit={handleFormSubmit}
            formData={selectedNote}
          />
        </Grid>
        <Grid item xs={12}>
          <DynamicTable data={notes} columns={myColumns} rowsPerPage={5}/>
          <GenericConfirmDialog
            open={confirmOpen}
            onCancel={handleCancel}
            onConfirm={confirmDelete}
            title="Confirm Deletion"
            content="Are you sure you want to delete this note?"
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Notes;
