import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import ActionButtons from "../molecules/actionButtons";
import NotesDialog from "../organisms/notesDialog";
import DynamicTable from "../organisms/table";
import { getNotes } from "../../apiService";

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

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const data = await getNotes();
        setNotes(data.details);
        console.log(data.details);
      } catch (error: any) {
        console.error("Error fetching Notes:", error.message);
      }
    };

    fetchNotes();
  }, []);

  const handleEditClick = () => {};

  // const handleSaveClick = async () => {
  //   try {
  //     const response = await fetch("/api/UpdateOrganizationDetails", {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(notes),
  //     });

  //     if (response.ok) {
  //       console.log("Data saved successfully!");
  //     } else {
  //       console.error("Error saving data:", response.statusText);
  //     }
  //   } catch (error) {
  //     console.error("Error sending data:", error);
  //   }
  // };

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
      renderCell: () => (
        <ActionButtons
          onEdit={handleEditClick}
          onDelete={handleEditClick}
        ></ActionButtons>
      ),
    },
  ];

  return (
    <>
      <Grid xs={12} sx={{ mb: 1 }}>
        <NotesDialog isEdit={false} ></NotesDialog>
      </Grid>
      <DynamicTable data={notes} columns={myColumns}></DynamicTable>
    </>
  );
};

export default Notes;
