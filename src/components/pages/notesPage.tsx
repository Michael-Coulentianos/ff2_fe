import React, { useState, useEffect } from "react";
import {
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import DynamicTable from "../organisms/table";
import { getNotes, deleteNote, getNoteById } from "../../apiService";
import Loading from "./loading";
import NotesDialog from "../organisms/notesDialog";
import GenericConfirmDialog from "../organisms/genericConfirmDialog";

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
        const data = await getNotes();
        setNotes(data);
      } catch (error: any) {
        console.error("Error fetching Notes:", error.message);
      }
    };

    fetchNotes();

    setIsLoading(false);
  }, []);
  const handleEditClick = () => {};

  const fetchNoteById = async (id: number) => {
    console.log(id);
    try {
      const res = await getNoteById(id);
      console.log(res);
    } catch (error) {
      console.error("Error fetching data:", error);
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
      label: "Date Created ",
      dataKey: "date",
      renderCell: (item) => <span>{item.createdDate}</span>,
    },
    {
      label: "Action Buttons",
      dataKey: "actionBtns",
      renderCell: (item) => (
        <ActionButtons
          onEdit={() => fetchNoteById(item?.noteId)}
          onDelete={() => handleDeleteClick(item?.noteId)}
          onSubmit={() => handleSubmit(item?.noteId)}
        ></ActionButtons>
      ),
    },
  ];

  //Handler Methods
  if (isLoading) {
    return <Loading></Loading>;
  }

  const handleCancel = () => {
    setConfirmOpen(false);
    setCurrentNoteId(null);
  };

  const handleSubmit = (noteId: number) => {
    console.log(`Submitted party with ID: ${noteId}`);
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

  return (
    <>
      <Grid xs={12} sx={{ mb: 1 }}>
        <NotesDialog isEdit={false}></NotesDialog>
      </Grid>
      <DynamicTable data={notes} columns={myColumns}></DynamicTable>
      <GenericConfirmDialog
        open={confirmOpen}
        onCancel={handleCancel}
        onConfirm={confirmDelete}
        title="Confirm Deletion"
        content="Are you sure you want to delete this note?"
      />
    </>
  );
};

export default Notes;
