import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleDeleteClick = async (noteId: string | number) => {
    try {
      await deleteNote(noteId);
      setNotes(notes.filter(note => note.noteId !== noteId));
      console.log('Note deleted successfully');
    } catch (error) {
      console.error('Failed to delete note:', error);
    }
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
        <NotesDialog isEdit={false}></NotesDialog>
      </Grid>
      <DynamicTable data={notes} columns={myColumns}></DynamicTable>
    </>
  );
};

export default Notes;
