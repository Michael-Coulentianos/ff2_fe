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
  description: yup.string().optional(), //required("This field is required"),
  activityCategory: yup.string().optional(), //.required("This field is required"),
  activityStatus: yup.string().optional(), //.required("This field is required"),
  seasonStages: yup.string().optional(), //.required("This field is required"),
  dateRange: yup.string().optional(),
  fields: yup.string().optional(),
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
  organizations,
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
      });
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
    organizations,
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
    ],
    generalActivityDetails1: [
      { id: "fields", label: "Fields", type: "text" },
      { id: "notes", label: "Notes", type: "text" },
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
