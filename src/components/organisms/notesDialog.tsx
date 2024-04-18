import React, { useState } from "react";
import {
  Container,
  IconButton,
  Grid,
  styled,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import EditIcon from "@mui/icons-material/Edit";
import TextBox from "../atom/textBox";
import CloseIcon from "@mui/icons-material/Close";

const MuiDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface Notes {
  name: string;
  contactInfo: string;
  address: string;
}
interface NotesProps {
  isEdit: boolean;
  onEdit?: any; // replace 'any' with the type of your 'onEdit' function
}

const NotesDialog: React.FC<NotesProps> = ({ isEdit, onEdit }) => {
  const [Notes, setNotes] = useState<Notes>({
    name: "",
    contactInfo: "",
    address: "",
  });

  const handleInputChange =
    (key: keyof Notes) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setNotes({ ...Notes, [key]: event.target.value });
    };

  // const handleEditClick = () => {};

  const handleSaveClick = async () => {
    try {
      const response = await fetch("/api/UpdateNotesDetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Notes),
      });

      if (response.ok) {
        console.log("Data saved successfully!");
      } else {
        console.error("Error saving data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {isEdit && (
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
      )}
      <Container>
        {!isEdit && (
          <Button variant="contained" color="primary" onClick={handleOpenModal}>
            Add
          </Button>
        )}
        <MuiDialog
          onClose={handleCloseModal}
          aria-labelledby="customized-dialog-title"
          open={modalOpen}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <Grid container direction="row">
              <Grid item xs={12}>
                Notes
              </Grid>
            </Grid>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            size="small"
            sx={{
              position: "absolute",
              right: 10,
              top: 15,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={handleSaveClick}>
            <DialogContent dividers>
              <TextBox
                label="Title"
                value={Notes.name}
                onChange={handleInputChange("name")}
              />
              <TextBox
                label="Type"
                value={Notes.contactInfo}
                onChange={handleInputChange("contactInfo")}
              />
              <TextBox
                label="Date"
                value={Notes.address}
                onChange={handleInputChange("address")}
              />
              <TextBox
                label="Description"
                value={Notes.address}
                onChange={handleInputChange("address")}
              />

              <TextBox
                label="Infection percentage"
                value={Notes.address}
                onChange={handleInputChange("address")}
              />
              <TextBox
                label="Attach file"
                value={Notes.address}
                onChange={handleInputChange("address")}
              />
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenModal}
                type="submit"
                startIcon={<SaveIcon />}
              >
                Add
              </Button>
            </DialogActions>
          </form>
        </MuiDialog>
      </Container>
    </>
  );
};

export default NotesDialog;
