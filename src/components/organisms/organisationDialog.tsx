import  { useEffect } from "react";
import {
  Grid,
  Checkbox,
  FormControlLabel,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormSection from "../molecules/DynamicFormSection";
import DynamicFormDialog from "../molecules/dialog";


const validationSchema = yup.object({
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
  registrationNumber: yup.string().optional(),
  addressId: yup.number().optional(),
  addressLine1: yup.string().optional(),
  addressLine2: yup.string().optional(),
  city: yup.string().optional(),
  code: yup.string().optional(),
  sameAddress: yup.boolean().optional(),
});

const OrganizationDialog = ({
  isOpen,
  onClose,
  onSubmit,
  legalEntities,
  formData,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {},
  });

  const checkboxValue = watch("sameAddress");

  useEffect(() => {
    if (isOpen) {
      const initialValues = {
        ...formData,
        contactPerson: formData?.contactPerson || [
          { fullName: "", contactNumber: "", emailAddress: "" },
        ],
        physicalAddress: formData?.physicalAddress || [
          { addressLine1: "", addressLine2: "", city: "", code: "" },
        ],
        postalAddress: formData?.postalAddress || [
          { addressLine1: "", addressLine2: "", city: "", code: "" },
        ],
        legalEntityTypeName: formData?.legalEntityTypeName || "",
        sameAddress: formData?.sameAddress || false,
      };
      reset(initialValues);
    }
  }, [formData, isOpen, legalEntities, reset]);

  const fieldDefinitions = {
    organizationDetails: [
      { id: "name", label: "Organization Name", type: "text" },
      { id: "vatNumber", label: "VAT Number", type: "text" },
      { id: "registrationNumber", label: "Registration Number", type: "text" },
      {
        id: "legalEntityTypeName",
        label: "Legal Entity Type",
        type: "select",
        options: legalEntities.map((entity) => ({
          label: entity.name,
          value: entity.name,
        })),
      },
    ],
    contact: [
      { id: "contactPerson[0].fullName", label: "Full Name", type: "text" },
      {
        id: "contactPerson[0].contacts[1].details",
        label: "Contact Number",
        type: "text",
      },
      { id: "contactPerson[0].contacts[0].details", label: "Email", type: "email" },
    ],
    address: [
      {
        id: "physicalAddress[0].addressLine1",
        label: "Address Line 1",
        type: "text",
      },
      {
        id: "physicalAddress[0].addressLine2",
        label: "Address Line 2",
        type: "text",
      },
      { id: "physicalAddress[0].city", label: "City", type: "text" },
      { id: "physicalAddress[0].code", label: "Postal Code", type: "text" },
    ],
    postal: [
      {
        id: "postalAddress[0].addressLine1",
        label: "Address Line 1",
        type: "text",
      },
      {
        id: "postalAddress[0].addressLine2",
        label: "Address Line 2",
        type: "text",
      },
      { id: "postalAddress[0].city", label: "City", type: "text" },
      { id: "postalAddress[0].code", label: "Postal Code", type: "text" },
    ],
  };


  const formContent = (
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
                    onChange={(e) => field.onChange(e.target.checked)}
                    color="primary"
                  />
                }
                label="Postal address the same"
              />
            )}
          />
          {!checkboxValue && (
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
        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<SaveIcon />}
        >
          {formData ? "Save Changes" : "Save"}
        </Button>
      </DialogActions>
    </form>
  );

  return (
    <DynamicFormDialog
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={formData ? "Update Organisation" : "Add Organisation"}
      formContent={formContent}
    />
  );
};

export default OrganizationDialog;

