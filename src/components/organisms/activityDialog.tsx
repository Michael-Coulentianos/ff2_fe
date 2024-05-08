import { useEffect } from "react";
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
  activityCategory: yup.string().optional(),
  activityStatus: yup.string().optional(),
  seasonStages: yup.string().optional(),
  dateRange: yup.string().optional(),
  fields: yup.string().optional(),
  noteId: yup.string().optional(),
  notes: yup.string().optional(),
  contractWorkCost: yup.string().optional(),
  cost: yup.string().optional(),
  assignee: yup.string().optional(),
});

const ActivityDialog = ({
  isOpen,
  onClose,
  onSubmit,
  activityCategory,
  activityStatus,
  seasonStages,
  noteList,
  formData,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      name: "",
      description: "",
      dateRange: "",
      activityCategory:
        activityCategory.length > 0 ? activityCategory[0].name : "",
      activityStatus: activityStatus.length > 0 ? activityStatus[0].name : "",
      seasonStages: seasonStages.length > 0 ? seasonStages[0].name : "",
      fields: "",
      notes: "",
      contractWorkCost: "",
      cost: "",
      assignee: "",
    },
  });

  const watchactivityCategory = watch("activityCategory");
  const watchNotes = watch("notes"); 
  
  useEffect(() => {
    if (isOpen && formData) {
      const activityProperty = JSON.parse(formData.activityProperty);
      for (const key in activityProperty) {
        if (activityProperty.hasOwnProperty(key)) {
          formData[key] = activityProperty[key];
        }
      }
      reset({
        ...formData,
        activityCategory:
          formData.activityCategory || activityCategory[0]?.name,
        activityStatus: formData.activityStatus || activityStatus[0]?.name,
        seasonStages: formData.seasonStages || seasonStages[0]?.name,
        notes:
          formData.notes || (noteList.length > 0 ? noteList[0].title : ""),
        noteId:
          formData.noteId ||
          noteList.find((note) => note.title === formData.notes)?.noteId,
      });
      setValue("noteId", noteList.find((nt) => nt.title === watchNotes)?.noteId);

      
    }
    if (!isOpen) {
      reset({
        name: "",
        description: "",
        dateRange: "",
        activityCategory:
          activityCategory.length > 0 ? activityCategory[0].name : "",
        activityStatus: activityStatus.length > 0 ? activityStatus[0].name : "",
        seasonStages: seasonStages.length > 0 ? seasonStages[0].name : "",
        fields: "",
        notes: "",
        contractWorkCost: "",
        cost: "",
        assignee: "",
      });
    }
  }, [
    formData,
    isOpen,
    reset,
    activityCategory,
    setValue,
    watchactivityCategory,
    noteList,
  ]);

  const fieldDefinitions = {
    generalActivityDetails: [
      { id: "name", label: "Activity Name", type: "text" },
      {
        id: "activityCategory",
        label: "Activity Category",
        type: "select",
        options: activityCategory?.map((type) => ({
          label: type.name,
          value: type.name,
        })),
      },
      {
        id: "activityStatus",
        label: "Activity Status",
        type: "select",
        options: activityStatus?.map((type) => ({
          label: type.value,
          value: type.value,
        })),
      },
      {
        id: "seasonStages",
        label: "Season Stages",
        type: "select",
        options: seasonStages?.map((type) => ({
          label: type.value,
          value: type.value,
        })),
      },
    ],
    generalActivityDetails0: [
      { id: "description", label: "Description", type: "multiText" },
      { id: "dateRange", label: "Activity Date Range", type: "dateRange" },
      {
        id: "notes",
        label: "Notes",
        type: "select",
        options: noteList?.map((type) => ({
          label: type.title,
          name: type.title,
        })),
      },
    ],
    generalActivityDetails1: [
      { id: "fields", label: "Fields", type: "text" },

      { id: "contractWorkCost", label: "Contract Work Cost", type: "text" },
      { id: "cost", label: "Cost", type: "text" },
      { id: "assignee", label: "Assignee", type: "text" },
    ],
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit)}>
      <DialogContent dividers sx={{ pt: 1, pb: 1 }}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
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
