import { useEffect, useState } from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import FormSection from "../molecules/DynamicFormSection";
import DynamicFormDialog from "../molecules/dialog";
import { formatDate } from "../../utils/Utilities";

interface FormData {
  activityId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  field: string;
  cost: string;
  contractWorkCost: string;
  properties: any;
  activityCategoryId: number;
  activityStatusId: number;
  seasonStageId: number;
  partyId: number;
  property: any;
}

interface Field {
  id: string;
  label: string;
  type?: string;
  options?: Array<{ label: string; value: any; id: any; properties?: any }>;
  placeholder?: string;
}

const ActivityDialog = ({
  isOpen,
  onClose,
  onSubmit,
  activityCategory,
  activityStatus,
  seasonStages,
  notes,
  formData,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      activityId: "",
      name: "",
      description: "",
      startDate: "",
      endDate: "",
      field: "",
      cost: "",
      contractWorkCost: "",
      activityCategoryId: 0,
      seasonStageId: 0,
      partyId: 0,
      activityStatusId: 0,
    },
  });

  useEffect(() => {
    if (formData) {
      const status = activityStatus.find(
        (status) => status.value === formData.status
      );
      const properties = formData.property ? JSON.parse(formData.property) : {};
      reset({
        ...formData,
        ...properties, 
        startDate: formatDate(formData.startDate),
        endDate: formatDate(formData.endDate),
        activityStatusId: status ? status.key : null,
      });
    }
  }, [formData, reset]);

  const activityCategoryId = watch("activityCategoryId");

  function addPropertyIfNotEmpty(obj: any, key: string, value: any) {
    if (value !== null && value !== undefined) {
      obj[key] = value;
    }
  }

  const processProperties = (properties, parentKey = ""): Field[] => {
    return properties.flatMap((prop) => {
      if (prop.key.toLowerCase() === "color") return [];
      const id =
        (parentKey ? `${parentKey}_` : "") +
        prop.key.toLowerCase().replace(/\s+/g, "");
      const result: Field[] = [
        {
          id,
          label: prop.key,
          type: prop.type,
          options:
            prop.type === "select"
              ? prop.value.map((option) => ({
                  label:
                    option.Option + (option.unit ? ` (${option.unit})` : ""),
                  value: option.id,
                  id: option.id,
                  properties: option.properties || [],
                }))
              : undefined,
        },
      ];

      return result;
    });
  };

  const [dynamicFields, setDynamicFields] = useState<Field[]>([]);

  useEffect(() => {
    if (activityCategoryId) {
      const selectedCategory = activityCategory.find(
        (category) => category.activityCategoryId === activityCategoryId
      );

      if (selectedCategory && selectedCategory.properties) {
        const properties = JSON.parse(selectedCategory.properties);
        const dynamicGeneralActivityDetails = processProperties(properties);

        setDynamicFields(dynamicGeneralActivityDetails);
      } else {
        setDynamicFields([]);
      }
    }
  }, [activityCategoryId, activityCategory]);

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
          id: type.activityCategoryId,
        })),
      },
      { id: "startDate", label: "Start Date", type: "date" },
      { id: "endDate", label: "End Date", type: "date" },
      ...(formData
        ? [
            {
              id: "activityStatusId",
              label: "Activity Status",
              type: "select",
              options: activityStatus?.map((type) => ({
                label: type.value,
                value: type.key,
                id: type.key,
              })),
            },
          ]
        : []),
      {
        id: "seasonStageId",
        label: "Season Stages",
        type: "select",
        options: seasonStages?.map((type) => ({
          label: type.value,
          value: type.key,
          id: type.key,
        })),
      },
    ],
    generalActivityDetails0: [
      { id: "description", label: "Description", type: "multiText" },
    ],
    generalActivityDetails2: [
      { id: "field", label: "Field", type: "text" },
      { id: "contractWorkCost", label: "Contract Work Cost", type: "currency" },
      { id: "cost", label: "Cost", type: "currency" },
    ],
    activityNotes: [
      {
        id: "noteDetail",
        label: "Notes",
        type: "select",
        options: notes?.map((type) => ({
          label: type.title,
          name: type.noteId,
          value: type.title,
        })),
      },
    ],
    activityNotesAdd: [
      {
        id: "noteDetail",
        label: "Notes",
        type: "selectAdd",
        options: notes?.map((type) => ({
          label: type.title,
          name: type.noteId,
          value: type.title,
        })),
      },
    ],
  };

  const handleFormSubmit = (data: FormData) => {
    console.log("Dynamic Fields:", dynamicFields);

    const properties: { [key: string]: any } = {};

    dynamicFields.forEach((field) => {
      const value = data[field.id];
      console.log(`Adding property ${field.id}:`, value);
      addPropertyIfNotEmpty(properties, field.id, value);
    });

    const finalData: FormData = {
      activityId: data.activityId,
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      field: data.field,
      cost: data.cost,
      contractWorkCost: data.contractWorkCost,
      properties: JSON.stringify(properties),
      activityCategoryId: data.activityCategoryId,
      seasonStageId: data.seasonStageId,
      partyId: data.partyId,
      activityStatusId: data.activityStatusId,
      property: undefined
    };

    onSubmit(finalData);
  };

  const formContent = (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
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
            fields={fieldDefinitions.generalActivityDetails2}
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
      onSubmit={handleSubmit(handleFormSubmit)}
      title={formData ? "Update Activity" : "Add Activity"}
      formContent={formContent}
    />
  );
};

export default ActivityDialog;
