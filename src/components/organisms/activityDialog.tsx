import { useEffect } from "react";
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
  status: yup.string().optional(),
  seasonStageId: yup.string().optional(),
  startDate: yup.string().optional(),
  endDate: yup.string().optional(),
  field: yup.string().optional(),
  noteDetail: yup.string().optional(),
  partyId: yup.number().optional(),
  contractWorkCost: yup.string().optional(),
  cost: yup.string().optional(),
  assignedTo: yup.string().optional(),
});

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
      assignedTo: "",
    }
  });

  //const watchactivityCategory = watch("category");
  
  useEffect(() => {
    if (isOpen && formData) {
      const activityProperty = JSON.parse(formData.property);
      for (const key in activityProperty) {
        if (activityProperty.hasOwnProperty(key)) {
          formData[key] = activityProperty[key];
        }
      }
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
        cost: "",
        assignedTo: "",
      });
    }
  }, [formData, isOpen, reset, activityCategory, noteList, activityStatus, seasonStages]);

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
    ],
    generalActivityDetails0: [
      { id: "dateRange", label: "Activity Date Range", type: "dateRange" },
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
        options: noteList?.map((type) => ({
          label: type.title,
          name: type.noteId,
          value: type.title
        })),
      },
    ],
    generalActivityDetails1: [
      { id: "field", label: "Field", type: "text" },
      { id: "contractWorkCost", label: "Contract Work Cost", type: "text" },
      { id: "cost", label: "Cost", type: "text" },
      { id: "assignedTo", label: "Assignee", type: "text" },
    ],
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers sx={{ pt: 1, pb: 1 }}>
        <Grid container spacing={1} sx={{ padding: 2 }}>

          <FormSection
            title=""
            fields={fieldDefinitions.generalActivityDetails}
            control={control}
            errors={errors}
            columns={2}
          />

          <FormSection
            title=""
            fields={fieldDefinitions.generalActivityDetails0}
            control={control}
            errors={errors}
            columns={1}
          />
          <FormSection
            title=""
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
