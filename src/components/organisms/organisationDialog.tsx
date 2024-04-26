import React, { useEffect, useState } from "react";
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

export const validationSchema = yup.object().shape({
  orgName: yup.string().required("This field is required"),
  vatNumber: yup.string().required("This field is required"),
  LegalEntityTypeId: yup.string().required("This field is required"),
  registrationNumber: yup.string().required("This field is required"),
  emailAddress: yup
    .string()
    .email("Invalid email")
    .required("This field is required"),
  contactNumber: yup.string().required("This field is required"),
  fullName: yup.string().required("This field is required"),
  addressLine1: yup.string().required("This field is required"),
  addressLine2: yup.string().required("This field is required"),
  city: yup.string().required("This field is required"),
  code: yup.string().required("This field is required"),
});

interface OrganizationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  formData?: any;
}

const OrganizationDialog: React.FC<OrganizationDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

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

  return (
      <Container>
        <MuiDialog
          onClose={onClose} open={isOpen}
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
            onClick={onClose}
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
          <form onSubmit={handleSubmit((data) => { onSubmit(data); onClose(); })}>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={6}>
                  <Controller
                    name="orgName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextBox
                        {...field}
                        label="Organization Name"
                        error={!!errors.orgName}
                        helperText={errors.orgName?.message}
                      />
                    )}
                  />
                  <Controller
                    name="vatNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextBox
                        {...field}
                        label="VAT Number"
                        error={!!errors.vatNumber}
                        helperText={errors.vatNumber?.message}
                      />
                    )}
                  />
                  <Controller
                    name="registrationNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextBox
                        {...field}
                        label="Registration Number"
                        error={!!errors.registrationNumber}
                        helperText={errors.registrationNumber?.message}
                      />
                    )}
                  />
                  <Controller
                    name="emailAddress"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextBox
                        {...field}
                        label="Email Address"
                        error={!!errors?.emailAddress}
                        helperText={errors?.emailAddress?.message}
                      />
                    )}
                  />
                  <Controller
                    name="contactNumber"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextBox
                        {...field}
                        label="Contact Number"
                        error={!!errors?.contactNumber}
                        helperText={errors?.contactNumber?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="fullName"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextBox
                        {...field}
                        label="Full Name"
                        error={!!errors?.fullName}
                        helperText={errors?.fullName?.message}
                      />
                    )}
                  />

                <Controller
                  name="addressLine1"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextBox
                      {...field}
                      label="Address Line 1"
                      error={!!errors?.addressLine1}
                      helperText={errors?.addressLine1?.message}
                    />
                  )}
                />

                <Controller
                  name="addressLine2"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextBox
                      {...field}
                      label="Address Line 2"
                      error={!!errors?.addressLine2}
                      helperText={errors?.addressLine2?.message}
                    />
                  )}
                />

                <Controller
                  name="city"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextBox
                      {...field}
                      label="City"
                      error={!!errors?.city}
                      helperText={errors?.city?.message}
                    />
                  )}
                />

                  <Controller
                    name="code"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextBox
                        {...field}
                        label="Code"
                        error={!!errors?.code}
                        helperText={errors?.code?.message}
                      />
                    )}
                  />
                </Grid>
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
