import * as React from "react";
import Box from "@mui/material/Box";
import {
  Checkbox,
  FormControlLabel,
  Button,
  Container,
  Typography,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormSection from "../molecules/DynamicFormSection";
import { ForwardRefRenderFunction, useImperativeHandle } from "react";

const validationSchema = yup.object({
  fullName: yup.string().required("Required"),
  contactNumber: yup.string().required("Required"),
  emailAddress: yup.string().email().required("Required"),
  name: yup.string().required("Required"),
  vatNumber: yup.string().required("Required"),
  legalEntityTypeId: yup.string().required("Required"),
  registrationNumber: yup.string().required("Required"),
  addressLine1: yup.string().required("Required"),
  addressLine2: yup.string().optional(),
  city: yup.string().required("Required"),
  code: yup.string().required("Required"),
  sameAddress: yup.boolean().default(true),
});

type OnBoardingOrganisationFormProps = {
  onSubmit: (formData: any) => Promise<void>;
  legalEntities: any[];
};

const OnBoardingOrganisationForm: ForwardRefRenderFunction<
  unknown,
  OnBoardingOrganisationFormProps
> = ({ onSubmit, legalEntities }, ref) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      sameAddress: true,
    },
  });

  useImperativeHandle(ref, () => ({
    submitForm: handleSubmit(onSubmit),
  }));

  const checkboxValue = watch("sameAddress");

  const fieldDefinitions = {
    organizationDetails: [
      { id: "name", label: "Organization Name", type: "text" },
      { id: "vatNumber", label: "VAT Number", type: "text" },
      { id: "registrationNumber", label: "Registration Number", type: "text" },
      {
        id: "legalEntityTypeId",
        label: "Legal Entity Type",
        type: "select",
        options: legalEntities.map((entity) => ({
          id: entity.legalEntityTypeId,
          label: entity.name,
          value: entity.legalEntityTypeId,
        })),
      },
    ],
    contact: [
      { id: "fullName", label: "Full Name", type: "text" },
      { id: "contactNumber", label: "Contact Number", type: "text" },
      { id: "emailAddress", label: "Email", type: "email" },
    ],
    address: [
      { id: "addressLine1", label: "Address Line 1", type: "text" },
      { id: "addressLine2", label: "Address Line 2", type: "text" },
      { id: "city", label: "City", type: "text" },
      { id: "code", label: "Postal Code", type: "text" },
    ],
    postal: [
      { id: "postalAddressLine1", label: "Address Line 1", type: "text" },
      { id: "postalAddressLine2", label: "Address Line 2", type: "text" },
      { id: "postalAddressCity", label: "City", type: "text" },
      { id: "postalAddressCode", label: "Postal Code", type: "text" },
    ],
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Add Organisation
      </Typography>
      <form>
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
      </form>
    </Container>
  );
};

export default React.forwardRef(OnBoardingOrganisationForm);
