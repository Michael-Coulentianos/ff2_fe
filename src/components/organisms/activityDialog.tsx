import { useEffect, useState } from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import FormSection from "../molecules/DynamicFormSection";
import DynamicFormDialog from "../molecules/dialog";

const validationSchema = yup.object({
  name: yup.string().optional(),
  description: yup.string().optional(),
  activityCategoryId: yup.number().optional(),
  activityTypeId: yup.number().optional(),
  activityStatusId: yup.number().optional(),
  seasonStageId: yup.number().optional(),
  startDate: yup.string().optional(),
  endDate: yup.string().optional(),
  field: yup.string().optional(),
  noteId: yup.number().optional(),
  partyId: yup.number().optional(),
  contractWorkCost: yup.string().optional(),
  cost: yup.string().optional()
});

const ActivityDialog = ({
  isOpen,
  onClose,
  onSubmit: externalOnSubmit,
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
    }
  });

  const activityCategoryId = watch("activityCategoryId");

  useEffect(() => {
    if (activityCategoryId) {
        const selectedCategory = activityCategory.find(category => category.activityCategoryId === activityCategoryId);
        
        if (selectedCategory && selectedCategory.properties) {
            const properties = JSON.parse(selectedCategory.properties);

            const dynamicGeneralActivityDetails = properties
              .filter(prop => prop.key !== 'Color') 
              .map(prop => ({
                id: prop.key.toLowerCase().replace(/\s+/g, ''),
                label: prop.key,
                type: prop.type,
                options: prop.type === 'select' ? prop.value.map(option => ({
                    label: option.Option + (option.unit ? ` (${option.unit})` : ''),
                    value: option.id
                })) : undefined
              }));

            setDynamicFields(dynamicGeneralActivityDetails);
            console.log(dynamicGeneralActivityDetails);
        } else {
            setDynamicFields([]);
        }
    }
}, [activityCategoryId, activityCategory]);

const formatDate = (dateStr) => {
  if (!dateStr) return ""; // Return empty string if dateStr is undefined, null, or empty
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

  useEffect(() => {
    if (isOpen && formData) {
      // const activityProperty = JSON.parse(activityCategory[3].properties);
      // for (const key in activityProperty) {
      //   if (activityProperty.hasOwnProperty(key)) {
      //     formData[key] = activityProperty[key];
      //   }
      // }
      // const properties = formData.property;
      const initialValues = {
        ...formData,
        endDate: formatDate(formData.endDate),
        startDate: formatDate(formData.startDate),
      };
      reset(initialValues);
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

  interface SubmissionData {
    [key: string]: any; // Flexible key-value pairs, you can make this more specific
    properties: {
      [key: string]: any; // Defines a flexible structure for properties
    };
  }

  const onSubmit = (data: any) => { // Use 'any' temporarily, ideally you should define a specific type
    const updatedData: SubmissionData = {
      ...data,
      properties: {
        ...data.properties, // Safely spread existing properties if any
        ActivityType: data.activityType,
        Quantity: data.quantity
      }
    };
    
    externalOnSubmit(updatedData); // Call the external submit function with the updated data
  };



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
        id: "activityStatusId",
        label: "Activity Status",
        type: "select",
        options: activityStatus?.map((type) => ({
          label: type.value,
          value: type.key,
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
        id: "noteId",
        label: "Notes",
        type: "select",
        options: filteredNotes?.map((type) => ({
          label: type.title,
          name: type.noteId,
          value: type.noteId
        })),
      },
    ],
    generalActivityDetails1: [
      { id: "field", label: "Field", type: "text" },
      { id: "contractWorkCost", label: "Contract Work Cost", type: "currency" },
      { id: "cost", label: "Cost", type: "currency" }
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
