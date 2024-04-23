import React, { useState, useEffect } from "react";
import { Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import DynamicTable from "../organisms/table";
import { getAllNotes, deleteNote } from "../../apiService";
import Loading from "./loading";
import NotesDialog from "../organisms/notesDialog";

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState<number | null>(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchNotes = async () => {
      try {
        const data = await getAllNotes();
        setNotes(data.details);
      } catch (error: any) {
        console.error("Error fetching Notes:", error.message);
      }
    };

    fetchNotes();

    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleSubmit = (noteId: number) => {
    console.log(`Submitted party with ID: ${noteId}`);
  };

  const handleDeleteClick = (noteId: number) => {
    setCurrentNoteId(noteId); // Set the current note ID to be deleted
    setConfirmOpen(true); // Show confirmation dialog
  };

  const confirmDelete = async () => {
    if (currentNoteId !== null) {
      try {
        await deleteNote(currentNoteId);
        setNotes(notes.filter(note => note.id !== currentNoteId)); // Ensure you're filtering by the correct identifier
        console.log('Note deleted successfully');
      } catch (error) {
        console.error('Failed to delete note:', error);
      }
    }
    setConfirmOpen(false); // Close the confirmation dialog
    setCurrentNoteId(null); // Reset the pending deletion note ID
  };

  const handleCancel = () => {
    setConfirmOpen(false);
    setCurrentNoteId(null);
  };

  const handleEditClick = () => {};

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
          onEdit={handleEditClick}
          onDelete={() => handleDeleteClick(item?.noteId)}
          onSubmit={() => handleSubmit(item?.partyId)}
        ></ActionButtons>
      ),
    },
  ];

  return (
    <>
      <Grid xs={12} sx={{ mb: 1 }}>
        <NotesDialog isEdit={false} />
      </Grid>
      <DynamicTable data={notes} columns={myColumns} />
      <Dialog
        open={confirmOpen}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Confirm Deletion"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this note?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmDelete} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Notes;
