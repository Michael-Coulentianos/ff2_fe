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
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import TextBox from "../atom/textBox";
import { createOrganization } from "../../apiService";
import { Controller, useForm } from "react-hook-form";
import { Organization } from "../../models/organization.interface";
import { yupResolver } from "@hookform/resolvers/yup";

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

const MuiDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const OrganizationDialog: React.FC<OrganizationDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit2 = async (data) => {
    try {
      const response = await createOrganization(data);
      console.log(response.message);
      console.log("data org interface", data);

      const responseData = await response.json();

      if (!response.ok) {
        if (responseData.errors) {
          for (let key in responseData.errors) {
            setError(response, {
              type: "manual",
              message: responseData.errors[key],
            });
          }
        }
        throw new Error("Failed to create org");
      }
      alert("org created successfully");
      setModalOpen(false);
      reset();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <>
      {isOpen && (
        <IconButton onClick={handleEdit}>
          <EditIcon />
        </IconButton>
      )}
      <Container>
        {!isOpen && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
          >
            Add
          </Button>
        )}
        <MuiDialog
          onClose={onClose} open={isOpen}
          aria-labelledby="customized-dialog-title"
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
          <form onSubmit={handleSubmit(onSubmit)}>
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
