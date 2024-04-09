// Organisms
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";
import DynamicChip from "../atom/dynamicChip";
import ActionButtons from "../molecules/actionButtons";

interface TableData {
  id: number;
  name: string;
  type: string;
  date: string;
}

const initialData: TableData[] = [
  { id: 1, name: "Item 1", type: "General", date: "2022-01-01" },
  { id: 2, name: "Item 2", type: "Crop Analysis", date: "2022-01-02" },
  // Add more initial data as needed
];

const TableComponent: React.FC = () => {
  const [data, setData] = useState<TableData[]>(initialData);
  const [open, setOpen] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [newItemType, setNewItemType] = useState("");

  const handleAddItem = () => {
    const id = Math.max(...data.map((item) => item.id), 0) + 1;
    const newItem: TableData = {
      id,
      name: newItemName,
      type: newItemType,
      date: new Date().toISOString().slice(0, 10),
    };
    setData([...data, newItem]);
    setOpen(false);
    setNewItemName("");
    setNewItemType("");
  };

  const handleEditItem = (id: number) => {
    console.log(`Edit item with id ${id}`);
  };

  const handleDeleteItem = (id: number) => {
    setData(data.filter((item) => item.id !== id));
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Item
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <DynamicChip label={item.type} />
                </TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>
                  <ActionButtons
                    onEdit={() => handleEditItem(item.id)}
                    onDelete={() => handleDeleteItem(item.id)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Add Item</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Type"
                value={newItemType}
                onChange={(e) => setNewItemType(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button onClick={handleAddItem}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TableComponent;
