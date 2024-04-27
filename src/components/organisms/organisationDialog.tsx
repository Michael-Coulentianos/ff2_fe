import React, { useEffect, useState } from "react";
import { Container, IconButton, Grid, styled, DialogTitle, DialogContent, DialogActions, Button, Dialog, TextField } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useFieldArray } from 'react-hook-form';
import CloseIcon from "@mui/icons-material/Close";
import * as yup from "yup";
import TextBox from "../atom/textBox";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Organization } from '../../models/organization.interface';
import { Box, Tab, Tabs } from '@mui/material';
import TabPanel from '../organisms/tabPanel';
import FormControl from '../atom/formControl';
import FormSelect from '../molecules/formSelect';

interface OrganizationProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: Organization) => void;
  formData?: Organization | null;
}

const MuiDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const validationSchema = yup.object().shape({
  orgName: yup.string().required("Organization name is required"),
  vatNumber: yup.string().required("VAT number is required"),
  registrationNumber: yup.string().required("Registration number is required"),
  emailAddress: yup.string().email("Invalid email format").required("Email address is required"),
  contactNumber: yup.string().required("Contact number is required"),
  fullName: yup.string().required("Full name is required"),
  addressLine1: yup.string().required("Address line 1 is required"),
  addressLine2: yup.string().required("Address line 2 is required"),
  city: yup.string().required("City is required"),
  code: yup.string().required("Postal code is required"),
});

const OrganizationDialog: React.FC<OrganizationProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
}) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  });

  useEffect(() => {
    if (isOpen && formData) {
        reset({
          orgName: formData.name || "",
          vatNumber: formData.vatNumber || "",
          registrationNumber: formData.registrationNumber || "",
          emailAddress: formData.contactPerson[0].emailAddress || "",
          contactNumber: formData.contactPerson[0].contactNumber || "",
          fullName: formData.contactPerson[0].fullName || "",
          addressLine1: formData.physicalAddress[0].addressLine1 || "",
          addressLine2: formData.physicalAddress[0].addressLine2 || "",
          city: formData.physicalAddress[0].city || "",
          code: formData.physicalAddress[0].code || "",
        });
    }
    else{
      reset({
        orgName: "",
        vatNumber: "",
        registrationNumber: "",
        emailAddress: "",
        contactNumber: "",
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        code: "",
      });
    
    }
}, [formData, isOpen, reset]);

const [tabIndex, setTabIndex] = useState(0);

const handleTabChange = (event, newIndex) => {
  setTabIndex(newIndex);
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
        <form onSubmit={handleSubmit((data) => { onSubmit({
            ...data, id: "", partyId: 0, organizationId: 0, partyIdentifier: "",
            name: "",
            legalEntityTypeName: "",
            createdDate: "",
            contactPerson: [],
            sameAddress: false,
            physicalAddress: [],
            postalAddress: []
          }); onClose(); })}>
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


{/* <Box>
<Tabs value={tabIndex} onChange={handleTabChange} aria-label="basic tabs example">
  <Tab label="Personal Info" />
  <Tab label="Account Details" />
  <Tab label="Social Links" />
</Tabs>
<TabPanel value={tabIndex} index={0}>
  <FormControl id="firstName" label="First Name" placeholder="John" />
  <FormControl id="lastName" label="Last Name" placeholder="Doe" />
  <FormSelect label="Country" items={[{value: 'usa', label: 'USA'}, {value: 'canada', label: 'Canada'}]} />
  <FormControl id="phoneNumber" label="Phone Number" type="tel" placeholder="123-456-7890" />
</TabPanel>
<TabPanel value={tabIndex} index={1}>
  </TabPanel>
  <TabPanel value={tabIndex} index={2}>
  </TabPanel>
  </Box>  */}

export default OrganizationDialog;