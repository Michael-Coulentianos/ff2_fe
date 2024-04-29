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

const organizationSchema = yup.object().shape({
  partyId: yup.number().optional(),
  contactPersonId: yup.number().optional(),
  fullName: yup.string().optional(),
  contactNumber: yup.string().optional(),
  contactType: yup.string().optional(),
  emailAddress: yup.string().email().optional(),
  organizationId: yup.number().optional(),
  name: yup.string().optional(),
  vatNumber: yup.string().optional(),
  legalEntityTypeName: yup.string().optional(),
  legalEntityTypeId: yup.number().optional(),
  registrationNumber: yup.string().optional(),
  addressId: yup.number().optional(), 
  addressLine1: yup.string().optional(),
  addressLine2: yup.string().optional(),
  city: yup.string().optional(),
  code: yup.string().optional(),
  sameAddress: yup.boolean().optional(),
});

const OrganizationDialog = ({ isOpen, onClose, onSubmit, legalEntities, formData }) => {
  const { control, handleSubmit, reset, formState: { errors }, watch  } = useForm({
    resolver: yupResolver(organizationSchema),
    defaultValues: {
    }
  });

  useEffect(() => {
    if (isOpen) {
      const initialValues = {
        ...formData,
        contactPerson: formData?.contactPerson || [{ fullName: "", contactNumber: "", emailAddress: "" }],
        physicalAddress: formData?.physicalAddress || [{ addressLine1: "", addressLine2: "", city: "", code: "" }],
        postalAddress: formData?.postalAddress || [{ addressLine1: "", addressLine2: "", city: "", code: "" }],
        legalEntityTypeId: formData?.legalEntityTypeId || 1,
        legalEntityTypeName: formData?.legalEntityTypeName || "",
        sameAddress: formData?.sameAddress || false,
      };
      console.log("Initial Values:", initialValues);
      reset(initialValues);
    }
  }, [formData, isOpen, reset]);

  const checkboxValue = watch('sameAddress');

  const fieldDefinitions = {
    organizationDetails: [
      { id: 'name', label: 'Organization Name', type: 'text' },
      { id: 'vatNumber', label: 'VAT Number', type: 'text' },
      { id: 'registrationNumber', label: 'Registration Number', type: 'text' },
      { id: 'legalEntityTypeId', label: 'Legal Entity Type', type: 'select', options: legalEntities.map(entity => ({ label: entity.name, value: entity.legalEntityTypeId })) }
    ],
    contact: [
      { id: 'contactPerson[0].fullName', label: 'Full Name', type: 'text' },
      { id: 'contactPerson[0].contactNumber', label: 'Contact Number', type: 'text' },
      { id: 'contactPerson[1].emailAddress', label: 'Email', type: 'email' }
    ],
    address: [
      { id: 'physicalAddress[0].addressLine1', label: 'Address Line 1', type: 'text' },
      { id: 'physicalAddress[0].addressLine2', label: 'Address Line 2', type: 'text' },
      { id: 'physicalAddress[0].city', label: 'City', type: 'text' },
      { id: 'physicalAddress[0].code', label: 'Postal Code', type: 'text' }
    ],
    postal: [
      { id: 'postalAddress[0].addressLine1', label: 'Address Line 1', type: 'text' },
      { id: 'postalAddress[0].addressLine2', label: 'Address Line 2', type: 'text' },
      { id: 'postalAddress[0].city', label: 'City', type: 'text' },
      { id: 'postalAddress[0].code', label: 'Postal Code', type: 'text' }
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
                columns={4}
              />
              <FormSection 
                title="Contact Details" 
                fields={fieldDefinitions.contact} 
                control={control} 
                errors={errors} 
                columns={3}
              />
              <FormSection 
                title="Physical Address" 
                fields={fieldDefinitions.address} 
                control={control} 
                errors={errors} 
                columns={4}
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
                    label="Postal address the same"
                  />
                )}
              />
              { !checkboxValue && (
                <FormSection 
                  title="Postal Address" 
                  fields={fieldDefinitions.postal}
                  control={control} 
                  errors={errors} 
                  columns={4}
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
