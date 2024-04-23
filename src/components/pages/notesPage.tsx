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

interface Note {
  NoteTypeId: string;
  Title: string;
  PartyId: string;
  Location: string;
  Description: string;
  Attachment: any;
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

  const handleAddNote = async (note: Note) => {
    try {
      const response = await fetch("/api/CreateOrganization", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });

      if (response.ok) {
        console.log("Organization created successfully!");
      } else {
        console.error("Error creating organization:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const deleteNote = async (noteId: any) => {
    try {
      await deleteNote(noteId);
      console.log("deleted note ", { noteId });
    } catch (error: any) {
      console.error("Error fetching Notes:", error.message);
    }
  };
  const handleSubmit = (noteId: number) => {
    console.log(`Submitted party with ID: ${noteId}`);
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
          onDelete={() => deleteNote(item?.noteId)}
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
