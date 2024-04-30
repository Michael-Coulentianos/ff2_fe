import React, { useEffect } from 'react';
import { Container, IconButton, Grid, Checkbox, FormControlLabel, styled, DialogTitle, DialogContent, DialogActions, Button, Dialog } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import FormSection from '../atom/FormSection';

const MuiDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": { padding: theme.spacing(2) },
  "& .MuiDialogActions-root": { padding: theme.spacing(1) }
}));

const validationSchema = yup.object().shape({
  name: yup.string().required("Organization name is required"),
  vatNumber: yup.string().required("VAT number is required"),
  registrationNumber: yup.string().required("Registration number is required"),
  emailAddress: yup.string().email("Invalid email format").required("Email address is required"),
  contactNumber: yup.string().required("Contact number is required"),
  fullName: yup.string().required("Full name is required"),
  addressLine1: yup.string().required("Address line 1 is required"),
  addressLine2: yup.string().required("Address line 2 is required"),
  city: yup.string().required("City is required"),
  code: yup.string().required("Postal code is required"),
  legalEntityTypeName: yup.string().required("Legal entity selection is required"),
  sameAddress: yup.boolean().optional()
});

const OrganizationDialog = ({ isOpen, onClose, onSubmit, legalEntities, formData }) => {
  const { control, handleSubmit, reset, formState: { errors }, watch  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      vatNumber: "",
      registrationNumber: "",
      emailAddress: "",
      contactNumber: "",
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      code: "",
      legalEntityTypeName: "",
      sameAddress: false
    }
  });

  useEffect(() => {
    if (isOpen && formData) {
      const initialValues = {
        ...formData,
        emailAddress: formData.contactPerson?.[0]?.emailAddress || "",
        contactNumber: formData.contactPerson?.[0]?.contactNumber || "",
        fullName: formData.contactPerson?.[0]?.fullName || "",
        addressLine1: formData.physicalAddress?.[0]?.addressLine1 || "",
        addressLine2: formData.physicalAddress?.[0]?.addressLine2 || "",
        city: formData.physicalAddress?.[0]?.city || "",
        code: formData.physicalAddress?.[0]?.code || "",
        legalEntityTypeName: formData.legalEntityTypeName || "",
        sameAddress: formData.sameAddress || false,
      };
      reset(initialValues);
    }
  }, [formData, isOpen, reset]);

  const checkboxValue = watch('sameAddress');

  const fieldDefinitions = {
    organizationDetails: [
      { id: 'name', label: 'Organization Name', type: 'text' },
      { id: 'vatNumber', label: 'VAT Number', type: 'text' },
      { id: 'registrationNumber', label: 'Registration Number', type: 'text' },
      {
        id: 'legalEntityTypeName', label: 'Legal Entity Type', type: 'select',
        options: legalEntities.map(entity => ({ label: entity.name, value: entity.legalEntityTypeId }))
      }
    ],
    contact: [
      { id: 'fullName', label: 'Full Name', type: 'text' },
      { id: 'contactNumber', label: 'Contact Number', type: 'text' },
      { id: 'emailAddress', label: 'Email', type: 'email' }
    ],
    address: [
      { id: 'addressLine1', label: 'Address Line 1', type: 'text' },
      { id: 'addressLine2', label: 'Address Line 2', type: 'text' },
      { id: 'city', label: 'City', type: 'text' },
      { id: 'code', label: 'Postal Code', type: 'text' }
    ],
    postal: [
      { id: 'postalAddressLine1', label: 'Address Line 1', type: 'text' },
      { id: 'postalAddressLine2', label: 'Address Line 2', type: 'text' },
      { id: 'postalCity', label: 'City', type: 'text' },
      { id: 'postalCode', label: 'Postal Code', type: 'text' }
    ]
  };

  return (
    <Container>
      <MuiDialog onClose={onClose} open={isOpen} aria-labelledby="organization-dialog-title" fullWidth={true} maxWidth="lg" >
        <DialogTitle id="organization-dialog-title">{formData ? "Update" : "Add"}</DialogTitle>
        <IconButton aria-label="close" onClick={onClose} sx={{ position: "absolute", right: 10, top: 10, color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers sx={{ pt: 1, pb: 1 }}>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <FormSection 
                title="Organisation Details" 
                fields={fieldDefinitions.organizationDetails} 
                control={control} 
                errors={errors} 
                columns={2}
              />
              <FormSection 
                title="Contact Details" 
                fields={fieldDefinitions.contact} 
                control={control} 
                errors={errors} 
                columns={2}
              />
              <FormSection 
                title="Physical Address" 
                fields={fieldDefinitions.address} 
                control={control} 
                errors={errors} 
                columns={2}
              />
              <Controller
                name="sameAddress"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={e => field.onChange(e.target.checked)}
                        color="primary" 
                      />
                    }
                    label="Postal address the same as physical address"
                  />
                )}
              />
              { !checkboxValue && (
                <FormSection 
                  title="Postal Address" 
                  fields={fieldDefinitions.postal}
                  control={control} 
                  errors={errors} 
                  columns={2}
                />
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="primary" type="submit" startIcon={<SaveIcon />}>
              {formData ? "Save Changes" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </MuiDialog>
    </Container>
  );
};

export default OrganizationDialog;
