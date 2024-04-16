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

interface Organization {
  name: string;
  contactInfo: string;
  address: string;
}

const OrganizationDialog: React.FC = () => {
  const [organization, setOrganization] = useState<Organization>({
    name: "",
    contactInfo: "",
    address: "",
  });

  const handleInputChange =
    (key: keyof Organization) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setOrganization({ ...organization, [key]: event.target.value });
      };
  
  const handleEditClick = () => {};

  const handleSaveClick = async () => {
    try {
      const response = await fetch("/api/UpdateOrganizationDetails", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(organization),
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
    <Container>
      <Button variant="contained" color="primary" onClick={handleOpenModal}>
        Add
      </Button>
      <MuiDialog
        onClose={handleCloseModal}
        aria-labelledby="customized-dialog-title"
        open={modalOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Grid container direction="row">
            <Grid item xs={12}>
              Organization Settings
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
              label="Name"
              value={organization.name}
              onChange={handleInputChange("name")}
            />
            <TextBox
              label="Contact Info"
              value={organization.contactInfo}
              onChange={handleInputChange("contactInfo")}
            />
            <TextBox
              label="Address"
              value={organization.address}
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
  );
};

export default OrganizationDialog;
