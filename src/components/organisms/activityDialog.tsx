import { useEffect, useState } from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import FormSection from "../molecules/DynamicFormSection";
import DynamicFormDialog from "../molecules/Dialog";

const validationSchema = yup.object({
  name: yup.string().optional(),
  description: yup.string().optional(),
  activityCategoryId: yup.number().optional(),
  activityTypeId: yup.number().optional(),
  status: yup.string().optional(),
  seasonStageId: yup.string().optional(),
  startDate: yup.string().optional(),
  endDate: yup.string().optional(),
  field: yup.string().optional(),
  noteDetail: yup.string().optional(),
  partyId: yup.number().optional(),
  quantity: yup.number().optional(),
  contractWorkCost: yup.string().optional(),
  cost: yup.string().optional()
});

interface FieldOption {
  label: string;
  value: any;
}

interface DynamicField {
  id: string;
  label: string;
  type: string;
  options?: FieldOption[];
}

const ActivityDialog = ({
  isOpen,
  onClose,
  onSubmit,
  activityCategory,
  activityStatus,
  seasonStages,
  noteList,
  organizations,
  formData,
}) => {
  const [dynamicFields, setDynamicFields] = useState([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      field: "",
      contractWorkCost: "",
      cost: "",
      quantity: 0,
    }
  });

  const activityCategoryId = watch("activityCategoryId");

  useEffect(() => {
    if (activityCategoryId) {
        const selectedCategory = activityCategory.find(category => category.activityCategoryId === activityCategoryId);
        
        if (selectedCategory && selectedCategory.properties) {
            // Parse the properties JSON string into an array
            const properties = JSON.parse(selectedCategory.properties);

            // Dynamically create field definitions from properties
            const dynamicGeneralActivityDetails = properties
              .filter(prop => prop.key !== 'Color') // Assuming 'Color' is not needed in form
              .map(prop => ({
                id: prop.key.toLowerCase().replace(/\s+/g, ''),
                label: prop.key,
                type: prop.type,
                options: prop.type === 'select' ? prop.value.map(option => ({
                    label: option.Option + (option.unit ? ` (${option.unit})` : ''),
                    value: option.id
                })) : undefined
              }));

            // Set the dynamic fields into state or a ref if needed
            setDynamicFields(dynamicGeneralActivityDetails);
        } else {
            setDynamicFields([]);
        }
    }
}, [activityCategoryId, activityCategory]);

// Assuming setDynamicFields updates a state that holds the field definitions


  
  useEffect(() => {
    if (isOpen && formData) {
      // const activityProperty = JSON.parse(activityCategory[3].properties);
      // for (const key in activityProperty) {
      //   if (activityProperty.hasOwnProperty(key)) {
      //     formData[key] = activityProperty[key];
      //   }
      // }
      // const properties = formData.property;

      reset({
        ...formData
      });
    }
    if (!isOpen) {
      reset({
        name: "",
        description: "",
        field: "",
        contractWorkCost: "",
        cost: ""
      });
    }
  }, [formData, isOpen, reset, activityCategory, noteList, activityStatus, seasonStages]);

  const selectedPartyId = watch("partyId");
  const [filteredNotes, setFilteredNotes] = useState(noteList);

  useEffect(() => {
    if (selectedPartyId) {
      const organization = organizations.find(org => org.partyId === selectedPartyId);
      
      if (organization) {
        const filtered = noteList.filter(note => note.party === organization.name);
        setFilteredNotes(filtered);
      }
    }
  }, [selectedPartyId, noteList, organizations]);
  
  
  const fieldDefinitions = {
    generalActivityDetails: [
      { id: "name", label: "Activity Name", type: "text" },
      {
        id: "activityCategoryId",
        label: "Activity Category",
        type: "select",
        options: activityCategory?.map((type) => ({
          label: type.name,
          value: type.activityCategoryId,
          id: type.activityCategoryId
        })),
      },
      {
        id: "status",
        label: "Activity Status",
        type: "select",
        options: activityStatus?.map((type) => ({
          label: type.value,
          value: type.value,
          id: type.key
        })),
      },
      {
        id: "seasonStageId",
        label: "Season Stages",
        type: "select",
        options: seasonStages?.map((type) => ({
          label: type.value,
          value: type.key,
          id: type.key
        })),
      },
      { id: "startDate", label: "Start Date", type: "date" },
      { id: "endDate", label: "End Date", type: "date" },
    ],
    generalActivityDetails0: [
      { id: "description", label: "Description", type: "multiText" },
      {
        id: "partyId",
        label: "Organization",
        type: "select",
        options: organizations?.map((type) => ({
          label: type.name,
          name: type.partyId,
          value: type.partyId
        })),
      },
      {
        id: "noteDetail",
        label: "Notes",
        type: "select",
        options: filteredNotes?.map((type) => ({
          label: type.title,
          name: type.noteId,
          value: type.title
        })),
      },
    ],
    generalActivityDetails1: [
      { id: "field", label: "Field", type: "text" },
      { id: "contractWorkCost", label: "Contract Work Cost", type: "currency" },
      { id: "cost", label: "Cost", type: "currency" },
      { id: "quantity", label: "Quantity", type: "number" },
    ],
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers sx={{ pt: 1, pb: 1 }}>
        <Grid container spacing={1} sx={{ padding: 2 }}>

          <FormSection
            fields={fieldDefinitions.generalActivityDetails}
            control={control}
            errors={errors}
            columns={2}
          />

          <FormSection
              fields={dynamicFields}
              control={control}
              errors={errors}
              columns={2}
          />

          <FormSection
            fields={fieldDefinitions.generalActivityDetails0}
            control={control}
            errors={errors}
            columns={1}
          />
          <FormSection
            fields={fieldDefinitions.generalActivityDetails1}
            control={control}
            errors={errors}
            columns={2}
          />
        </Grid>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          startIcon={<SaveIcon />}
        >
          {formData ? "Update" : "Save"}
        </Button>
      </DialogActions>
    </form>
  );

  return (
    <DynamicFormDialog
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      title={formData ? "Update Activity" : "Add Activity"}
      formContent={formContent}
    />
  );
};

export default ActivityDialog;
