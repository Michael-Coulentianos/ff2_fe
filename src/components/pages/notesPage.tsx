import React, { useState } from "react";
import { Grid, Button, Divider, Paper, Typography } from "@mui/material";
import DynamicTable from "../organisms/table";
import {
  getNotes,
  deleteNote,
  createNote,
  updateNote,
  getNoteTypes,
} from "../../api-ffm-service";
import NotesDialog from "../organisms/notesDialog";
import GenericConfirmDialog from "../organisms/genericConfirmDialog";
import moment from "moment";
import DynamicChip from "../atom/dynamicChip";
import FileDisplay from "../organisms/fileDisplay";
import { useFetchData, fetchData } from "../../hooks/useFethData";
import Loading from "./loading";
import { useGlobalState } from "../../GlobalState";
import { addPropertyIfNotEmpty } from "../../utils/Utilities";
import ActionButtons from "../molecules/actionButtons";

const Notes: React.FC = () => {
  const [notes, setNotes] = useState<any[]>([]);
  const [noteTypes, setNoteTypes] = useState<any>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { selectedOrganization, activeAccount } = useGlobalState();

  useFetchData(getNotes, setNotes, setIsLoading, [
    selectedOrganization?.organizationId ?? 0,
  ]);
  useFetchData(getNoteTypes, setNoteTypes, setIsLoading);

  const handleOpenForm = () => {
    setFormOpen(true);
    setSelectedNote(null);
  };

  const handleCloseForm = () => {
    setSelectedNote(null);
    setFormOpen(false);
    setIsLoading(false);
    setConfirmOpen(false);
  };

  const handleEdit = (note) => {
    setSelectedNote(note);
    setFormOpen(true);
  };

  const handleDelete = (note) => {
    setSelectedNote(note);
    setConfirmOpen(true);
  };

  const handleSubmit = async (formData: any) => {
    setIsLoading(true);
    formData.azureUserId = activeAccount.localAccountId;
    formData.partyId = selectedOrganization?.partyId;
    formData.noteTypeId = noteTypes.find(
      (nt) => nt.name === formData.noteType
    )?.noteTypeId;

    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const hours = String(currentDate.getHours()).padStart(2, "0");
    const minutes = String(currentDate.getMinutes()).padStart(2, "0");
    const seconds = String(currentDate.getSeconds()).padStart(2, "0");
    const milliseconds = String(currentDate.getMilliseconds()).padStart(7, "0");

    const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;

    formData.createdDate = formattedDate;

    const properties = {};
    addPropertyIfNotEmpty(properties, "severityType", formData.severityType);
    addPropertyIfNotEmpty(
      properties,
      "severitySubType",
      formData.severitySubType
    );
    addPropertyIfNotEmpty(properties, "cropType", formData.cropType);
    addPropertyIfNotEmpty(
      properties,
      "yieldEstimateHeads",
      formData.yieldEstimateHeads
    );
    addPropertyIfNotEmpty(
      properties,
      "yieldEstimateRowWidth",
      formData.yieldEstimateRowWidth
    );
    addPropertyIfNotEmpty(
      properties,
      "yieldEstimateGrams",
      formData.yieldEstimateGrams
    );
    addPropertyIfNotEmpty(
      properties,
      "cropAnalysisType",
      formData.cropAnalysisType
    );
    addPropertyIfNotEmpty(properties, "cropSubType", formData.cropSubType);
    addPropertyIfNotEmpty(properties, "severityScale", formData.severityScale);

    if (selectedNote) {
      try {
        formData.property = JSON.stringify(properties);
        await updateNote(formData);
      } catch (error) {
        console.error("Error updating note:", error);
      }
    } else {
      try {
        formData.property = JSON.stringify(properties);
        await createNote(formData);
      } catch (error) {
        console.error("Error creating note:", error);
      }
    }

    fetchData(getNotes, setNotes, setIsLoading, [
      selectedOrganization?.organizationId ?? 0,
    ]);
    handleCloseForm();
  };

  const handleConfirm = async () => {
    if (selectedNote) {
      setIsLoading(true);
      try {
        await deleteNote(selectedNote.noteId);
        setNotes(notes.filter((note) => note.noteId !== selectedNote.noteId));
      } catch (error) {
        console.error("Failed to delete organization:", error);
      }
      setConfirmOpen(false);
      handleCloseForm();
      setIsLoading(false);
    }
  };

  const myColumns = [
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
      renderCell: (item) => (
        <DynamicChip name={item.noteType} types={noteTypes} />
      ),
    },
    {
      label: "Attachment",
      dataKey: "attachment",
      renderCell: (item) =>
        item.attachment ? (
          <FileDisplay
            fileName={item.fileName || "Attachment"}
            fileType={item.fileType || "unknown"}
            fileUrl={item.attachment}
          />
        ) : null,
    },
    {
      label: "Date",
      dataKey: "date",
      renderCell: (item) => (
        <p>Date: {moment(item.createdDate).format("DD MMMM YYYY")}</p>
      ),
    },
    {
      label: "",
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
      {isLoading && <Loading />}
      {!isLoading && (
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Notes</Typography>
            <Divider sx={{ marginTop: 1 }} />
          </Grid>
          <Grid item xs={12}>
            {notes.length === 0 && (
              <Paper
                sx={{
                  padding: "20px",
                  margin: 2,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ m: 2 }}>
                  You do not have any notes. Please click the button below to
                  add an organization.
                </Typography>
                <Button
                  variant="contained"
                  onClick={handleOpenForm}
                  color="primary"
                >
                  Add Note
                </Button>
              </Paper>
            )}
            <NotesDialog
              isOpen={formOpen}
              onClose={handleCloseForm}
              onSubmit={handleSubmit}
              formData={selectedNote}
              noteTypes={noteTypes}
              handleDelete={() => handleDelete(selectedNote)}
            />
          </Grid>

          {notes.length > 0 && (
            <>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  onClick={handleOpenForm}
                  color="primary"
                >
                  Add Note
                </Button>
              </Grid>
              <Grid item xs={12}>
                <DynamicTable
                  data={notes}
                  columns={myColumns}
                  rowsPerPage={5}
                />
                <GenericConfirmDialog
                  open={confirmOpen}
                  onCancel={() => setConfirmOpen(false)}
                  onConfirm={handleConfirm}
                  title="Confirm Deletion"
                  content="Are you sure you want to delete this note?"
                />
              </Grid>
            </>
          )}
        </Grid>
      )}
    </>
  );
};

export default Notes;
