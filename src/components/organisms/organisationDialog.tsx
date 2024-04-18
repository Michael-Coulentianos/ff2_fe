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

// useEffect(() => {
//   const addOrganization = async () => {
//     try {
//       const data = await createOrganization();
//       setNewOrganization((prevOrganizations) => [
//         ...prevOrganizations,
//         {
//           name: data.name,
//           vatNumber: data.vatNumber,
//           AzureUserId: data.AzureUserId,
//           LegalEntityTypeId: data.LegalEntityTypeId,
//           registrationNumber: data.registrationNumber,
//           contactPersonId: {
//             FullName: data.fullName,
//             ContactNumber: data.contactNumber,
//             EmailAddress: data.emailAddress,
//           },
//           addressId: {
//             AddressLine1: data.addressLine1,
//             AddressLine2: data.addressLine2,
//             City: data.city,
//             Code: data.code,
//           },
//         },
//       ]);
//     } catch (error: any) {
//       console.error("Error fetching organizations:", error.message);
//     }
//   };

//   addOrganization();
//   console.log(newOrganization);
// }, []);
interface OrganizationDialogProps {
  isEdit: boolean;
  onEdit?: any; // replace 'any' with the type of your 'onEdit' function
}

const MuiDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const OrganizationDialog: React.FC<OrganizationDialogProps> = ({
  isEdit,
  onEdit,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    vatNumber: "",
    AzureUserId: "",
    LegalEntityTypeId: "",
    registrationNumber: "",
    contactPersonId: {
      fullName: "",
      contactNumber: "",
      emailAddress: "",
    },
    addressId: {
      addressLine1: "",
      addressLine2: "",
      city: "",
      code: "",
    },
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await fetch("/api/createOrganization", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log("Data saved successfully!");
      } else {
        console.error("Error saving data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
    setModalOpen(false);
  };

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
          <form onSubmit={handleSave}>
            <DialogContent dividers>
              <TextBox
                label="Company Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <TextBox
                label="Registration number"
                value={formData.registrationNumber}
                onChange={handleInputChange}
              />
              <TextBox
                label="VAT number"
                value={formData.vatNumber}
                onChange={handleInputChange}
              />
              <TextBox
                label="Contact information"
                value={formData.contactPersonId}
                onChange={handleInputChange}
              />
              <TextBox
                label="Address"
                value={formData.addressId}
                onChange={handleInputChange}
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

export default OrganizationDialog;
