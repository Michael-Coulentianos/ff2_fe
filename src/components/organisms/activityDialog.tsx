import { useEffect, useState } from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import SaveIcon from "@mui/icons-material/Save";
import FormSection from "../molecules/DynamicFormSection";
import DynamicFormDialog from "../molecules/dialog";

interface FormData {
  activityId: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  field: string;
  cost: string;
  contractWorkCost: string;
  Properties: any;
  noteDetail: string;
  activityCategoryId: number;
  activityStatusId: number;
  statusId: number;
  seasonStageId: number;
  partyId: number;
}

interface Field {
  id: string;
  label: string;
  type?: string;
  options?: Array<{ label: string; value: any; id: any; }>;
  placeholder?: string;
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
  const [dynamicFields, setDynamicFields] = useState<Field[]>([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    defaultValues: {
      name: "Ty testing",
      description: "rewytryrdydry",
      startDate: "2024-05-13",
      endDate: "2024-05-13",
      field: "etryeryeryerye",
      cost: "250",
      contractWorkCost: "2500",
      noteDetail: undefined,
      partyId: 238,
      activityCategoryId: undefined,
      seasonStageId: 1,
    },
  });

  const activityCategoryId = watch("activityCategoryId");

  useEffect(() => {
    if (activityCategoryId) {
      const selectedCategory = activityCategory.find(
        (category) => category.activityCategoryId === activityCategoryId
      );

      if (selectedCategory && selectedCategory.properties) {
        const properties = JSON.parse(selectedCategory.properties);

        const dynamicGeneralActivityDetails = properties
          .filter((prop) => prop.key !== "Color")
          .map((prop) => ({
            id: prop.key.toLowerCase().replace(/\s+/g, ""),
            label: prop.key,
            type: prop.type,
            options:
              prop.type === "select"
                ? prop.value.map((option) => ({
                    label:
                      option.Option + (option.unit ? ` (${option.unit})` : ""),
                    value: option.id,
                  }))
                : undefined,
          }));

        setDynamicFields(dynamicGeneralActivityDetails);
      } else {
        setDynamicFields([]);
      }
    }
  }, [activityCategoryId, activityCategory]);

  function addPropertyIfNotEmpty(obj: any, key: string, value: any) {
    if (value) {
      obj[key] = value;
    }
  }

  const formatDate = (dateStr) => {
    if (!dateStr) return ""; // Return empty string if dateStr is undefined, null, or empty
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
  }
  

  useEffect(() => {
    if (isOpen && formData) {
      const properties = formData.property ? JSON.parse(formData.property) : {};

      const modifiedFormData = {
        ...formData,
        startDate: formatDate(formData.startDate),
        endDate: formatDate(formData.endDate),
        ...properties,
        properties: JSON.stringify(properties),
      };
      console.log(formData);
      console.log(modifiedFormData);

      reset(modifiedFormData);
    }
    if (!isOpen) {
      reset({
        name: "Ty testing",
        description: "rewytryrdydry",
        startDate: "2024-05-13",
        endDate: "2024-05-13",
        field: "etryeryeryerye",
        cost: "250",
        contractWorkCost: "2500",
        noteDetail: undefined,
        partyId: 238,
        activityCategoryId: undefined,
        seasonStageId: 1,
      });
    }
  }, [
    formData,
    isOpen,
    reset,
    activityCategory,
    noteList,
    activityStatus,
    seasonStages,
  ]);

  const selectedPartyId = watch("partyId");
  const [filteredNotes, setFilteredNotes] = useState(noteList);

  useEffect(() => {
    if (selectedPartyId) {
      const organization = organizations.find(
        (org) => org.partyId === selectedPartyId
      );

      if (organization) {
        const filtered = noteList.filter(note => note.party === organization.name);

        const createNewOption = {
          noteId: 0,
          title: 'Create New',
        };

        setFilteredNotes([createNewOption, ...filtered]);
      } else {
        const createNewOption = {
          noteId: 0,
          title: 'Create New',
        };
        setFilteredNotes([createNewOption]);
      }
    } else {
      setFilteredNotes(noteList);
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
          id: type.activityCategoryId,
        })),
      },
      {
        id: "status",
        label: "Activity Status",
        type: "select",
        options: activityStatus?.map((type) => ({
          label: type.value,
          value: type.value,
          id: type.key,
        })),
      },
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
          value: type.partyId,
        })),
      },
      {
        id: "noteDetail",
        label: "Notes",
        type: "select",
        options: filteredNotes?.map((type) => ({
          label: type.title,
          name: type.noteId,
          value: type.title,
        })),
      },
    ],
    generalActivityDetails1: [
      { id: "field", label: "Field", type: "text" },
      { id: "contractWorkCost", label: "Contract Work Cost", type: "currency" },
      { id: "cost", label: "Cost", type: "currency" },
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
      statusId: data.activityStatusId,
      name: data.name,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      field: data.field,
      cost: data.cost,
      contractWorkCost: data.contractWorkCost,
      Properties: JSON.stringify(properties),
      noteDetail: data.noteDetail,
      activityCategoryId: data.activityCategoryId,
      seasonStageId: data.seasonStageId,
      partyId: data.partyId,
      activityStatusId: data.activityStatusId
    };

    console.log("Final Data:", finalData);

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
      onSubmit={handleSubmit(handleFormSubmit)}
      title={formData ? "Update Activity" : "Add Activity"}
      formContent={formContent}
    />
  );
};

export default ActivityDialog;
