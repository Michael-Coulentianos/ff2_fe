import React, { useEffect } from "react";
import { Container, IconButton, Grid, styled, DialogTitle, DialogContent, DialogActions, Button, Dialog } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import TextBox from "../atom/textBox";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const MuiDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const validationSchema = yup.object().shape({
  orgName: yup.string().required("This field is required"),
  vatNumber: yup.string().required("This field is required"),
  LegalEntityTypeId: yup.string().required("This field is required"),
  registrationNumber: yup.string().required("This field is required"),
  emailAddress: yup.string().email("Invalid email").required("This field is required"),
  contactNumber: yup.string().required("This field is required"),
  fullName: yup.string().required("This field is required"),
  addressLine1: yup.string().required("This field is required"),
  addressLine2: yup.string().required("This field is required"),
  city: yup.string().required("This field is required"),
  code: yup.string().required("This field is required"),
});

const OrganizationDialog = ({ isOpen, onClose, onSubmit, formData }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (formData) {
      reset({
        orgName: formData.name || "",
        vatNumber: formData.vatNumber || "",
        LegalEntityTypeId: formData.legalEntityTypeId || "",
        registrationNumber: formData.registrationNumber || "",
        emailAddress: formData.emailAddress || "",
        contactNumber: formData.contactNumber || "",
        fullName: formData.fullName || "",
        addressLine1: formData.addressLine1 || "",
        addressLine2: formData.addressLine2 || "",
        city: formData.city || "",
        code: formData.code || "",
      });
    } else {
      // Reset to empty fields when there is no formData (i.e., adding new organization)
      resetFormFields();
    }
  }, [formData, reset]);

  const resetFormFields = () => {
    reset({
      orgName: "",
      vatNumber: "",
      LegalEntityTypeId: "",
      registrationNumber: "",
      emailAddress: "",
      contactNumber: "",
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      code: "",
    });
  };

  const handleClose = () => {
    onClose();
    resetFormFields();
  };

  return (
      <Container>
        <MuiDialog
          onClose={handleClose} open={isOpen}
          aria-labelledby="customized-dialog-title"
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <Grid container direction="row">
              <Grid item xs={12}>
                {formData ? "Update Organization" : "Add Organization"}
              </Grid>
            </Grid>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleClose}
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
          <form onSubmit={handleSubmit((data) => { onSubmit(data); handleClose(); })}>
            <DialogContent dividers>
              <Grid container spacing={3}>
                // The form fields remain the same, ensure you include all necessary fields
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                startIcon={<SaveIcon />}>
                {formData ? "Update" : "Save"}
              </Button>
            </DialogActions>
          </form>
        </MuiDialog>
      </Container>
  );
};

export default OrganizationDialog;
