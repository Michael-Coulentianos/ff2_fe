import { useEffect } from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import FormSection from "../molecules/DynamicFormSection";
import DynamicFormDialog from "../molecules/dialog";

const validationSchema = yup.object({
  title: yup.string().optional(), //required("This field is required"),
  activityType: yup.string().optional(), //required("This field is required"),
  party: yup.string().optional(),
  partyId: yup.number().optional(),
  description: yup.string().optional(), //required("This field is required"),
  date: yup.string().optional(), //required("This field is required"),
  attachment: yup.string().optional(),
  location: yup.string().optional(), //.required("This field is required"),
  severityType: yup.string().optional(), //.required("This field is required"),
  severitySubType: yup.string().optional(), //.required("This field is required"),
  cropType: yup.string().optional(), //.required("This field is required"),
  yieldEstimateHeads: yup.string().optional(), //.required("This field is required"),
  yieldEstimateRowWidth: yup.string().optional(), //.required("This field is required"),
  yieldEstimateGrams: yup.string().optional(), //.required("This field is required"),
  cropAnalysisType: yup.string().optional(), //required("This field is required"),
  cropSubType: yup.string().optional(), //.required("This field is required"),
  severityScale: yup.string().optional(), //.required("This field is required"),
});

const ActivityDialog = ({
  isOpen,
  onClose,
  onSubmit,
  activityTypes,
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
      title: "",
      description: "",
      date: "",
      attachment: "",
      location: "",
      severityType: "",
      severitySubType: "",
      cropType: "",
      activityType: activityTypes.length > 0 ? activityTypes[0].name : "",
      yieldEstimateHeads: "",
      yieldEstimateRowWidth: "",
      yieldEstimateGrams: "",
      cropAnalysisType: "",
      cropSubType: "",
      severityScale: "",
    },
  });

  const watchActivityType = watch("activityType");
  const watchParty = watch("party");
  const watchseverityType = watch("severityType");
  const watchcropAnalysisType = watch("cropAnalysisType");

  const options = getSubTypeOptions(watchseverityType);

  function getSubTypeOptions(watchseverityType) {
    switch (watchseverityType) {
      case "Damage":
        return [
          { id: 1, label: "UV" },
          { id: 2, label: "Hail" },
          { id: 3, label: "Wind" },
          { id: 4, label: "Animal" },
        ];
      case "Infection":
        return [
          { id: 1, label: "Insects" },
          { id: 2, label: "Nematodes" },
          { id: 3, label: "Fungus" },
          { id: 4, label: "Pest" },
          { id: 5, label: "Bacteria" },
          { id: 6, label: "Virus" },
        ];
      case "Water":
        return [
          { id: 1, label: "Logging" },
          { id: 2, label: "Damage" },
          { id: 3, label: "Shortage" },
        ];
      default:
        return []; // Default empty options
    }
  }

  const options2 = getSubTypeOptions2(watchcropAnalysisType);

  function getSubTypeOptions2(watchcropAnalysisType) {
    switch (watchcropAnalysisType) {
      case "Phenological phase":
        return [
          { id: 1, label: "Germination" },
          { id: 2, label: "Vegetative Stage" },
          { id: 3, label: "Reproductive Stage" },
          { id: 4, label: "Maturity" },
          { id: 5, label: "Senescence" },
          { id: 6, label: "Harvest" },
        ];
      case "Soil type":
        return [
          { id: 1, label: "Clay" },
          { id: 2, label: "Sandy" },
          { id: 3, label: "Silt" },
          { id: 4, label: "Loamy" },
          { id: 5, label: "Peaty" },
          { id: 6, label: "Chalky" },
        ];
      case "Deficiency type":
        return [
          { id: 1, label: "Calcium(Ca)" },
          { id: 2, label: "Nitrogen(N)" },
          { id: 3, label: "Phosphate(PO)" },
          { id: 4, label: "Sulphur(S)" },
          { id: 5, label: "Iron(fe)" },
          { id: 6, label: "Iron(fe)" },
          { id: 7, label: "Potassium(K)" },
          { id: 8, label: "Magnesium(Mg)" },
          { id: 9, label: "Manganese(Mn)" },
          { id: 10, label: "Zinc(Zn)" },
        ];
      default:
        return []; // Default empty options
    }
  }

  useEffect(() => {
    if (isOpen && formData) {
      const activityProperty = JSON.parse(formData.activityProperty);
      for (const key in activityProperty) {
        if (activityProperty.hasOwnProperty(key)) {
          formData[key] = activityProperty[key];
        }
      }
      reset({
        //...defaultValues,
        ...formData,
        activityType: formData.activityType || activityTypes[0]?.name,
        party:
          formData.party ||
          (organizations.length > 0 ? organizations[0].name : ""),
        partyId:
          formData.partyId ||
          organizations.find((org) => org.name === formData.party)?.partyId,
      });
      setValue(
        "partyId",
        organizations.find((nt) => nt.name === watchParty)?.partyId
      );
    }
    if (!isOpen) {
      reset({
        title: "",
        description: "",
        date: "",
        attachment: "",
        location: "",
        severityType: "",
        severitySubType: "",
        cropType: "",
        activityType: activityTypes.length > 0 ? activityTypes[0].name : "",
        yieldEstimateHeads: "",
        yieldEstimateRowWidth: "",
        yieldEstimateGrams: "",
        cropAnalysisType: "",
        cropSubType: "",
        severityScale: "",
      });
    }
  }, [
    formData,
    isOpen,
    reset,
    activityTypes,
    setValue,
    watchActivityType,
    watchParty,
    organizations,
  ]);

  const fieldDefinitions = {
    generalActivityDetails: [
      { id: "title", label: "Activity Title", type: "text" },
      {
        id: "party",
        label: "Organization",
        type: "select",
        options: organizations?.map((org) => ({
          label: org.name,
          value: org.name,
        })),
        onChange: (selectedName) =>
          setValue(
            "partyId",
            organizations.find((nt) => nt.name === selectedName)?.partyId
          ),
      },
    ],
    generalActivityDetails0: [
      { id: "description", label: "Description", type: "multiText" },
    ],
    generalActivityDetails1: [
      {
        id: "activityType",
        label: "Activity Type",
        type: "select",
        options: activityTypes?.map((type) => ({
          label: type.name,
          value: type.name,
        })),
      },
      { id: "date", label: "Activity Date", type: "date" },
    ],
    generalActivityDetails2: [{ id: "location", label: "Location", type: "map" }],
    generalActivityDetails3: [
      { id: "attachment", label: "Add file", type: "attachment" },
    ],
    severityActivity: [
      {
        id: "severityType",
        label: "Severity Type",
        type: "select",
        options: [
          { id: 1, label: "Damage" },
          { id: 2, label: "Infection" },
          { id: 3, label: "Water" },
        ].map((type) => ({ label: type.label, value: type.label })),
      },
      {
        id: "severitySubType",
        label: "Sub-Type",
        type: "select",
        options: options.map((type) => ({
          label: type.label,
          value: type.label,
        })),
      },
      { id: "severityScale", label: "Severity Scale (%)", type: "radioGroup" },
    ],
    yieldEstimateActivity: [
      {
        id: "cropType",
        label: "Crop Type",
        type: "select",
        options: [
          { id: 1, value: "Yellow Maize" },
          { id: 2, value: "White Maize" },
          { id: 3, value: "Soybeans" },
          { id: 4, value: "Dry beans" },
          { id: 5, value: "Sugarcane" },
          { id: 6, value: "Wheat" },
          { id: 7, value: "Barley" },
          { id: 8, value: "Tabaco" },
          { id: 9, value: "Potatoes" },
          { id: 9, value: "Cotton" },
          { id: 10, value: "Sunflower" },
        ].map((type) => ({
          label: type.value,
          value: type.id,
        })),
      },
      { id: "yieldEstimateHeads", label: "Heads/Plants per 10m", type: "text" },
      { id: "yieldEstimateRowWidth", label: "Row Width", type: "text" },
      { id: "yieldEstimateGrams", label: "Grams per head/plant", type: "text" },
    ],
    cropAnalysisActivity: [
      {
        id: "cropAnalysisType",
        label: "Crop Analysis Type",
        type: "select",
        options: [
          { id: 1, label: "Phenological phase" },
          { id: 2, label: "Soil type" },
          { id: 3, label: "Deficiency type" },
        ].map((type) => ({
          label: type.label,
          value: type.label,
        })),
      },
      {
        id: "cropSubType",
        label: "Sub-Type",
        type: "select",
        options: options2.map((type) => ({
          label: type.label,
          value: type.label,
        })),
      },
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

          {watchActivityType === "Yield Estimate" && (
            <FormSection
              title="Yield Estimate"
              fields={fieldDefinitions.yieldEstimateActivity}
              control={control}
              errors={errors}
              columns={2}
            />
          )}
          {watchActivityType === "Damage" && (
            <FormSection
              title="Severity Activity"
              fields={fieldDefinitions.severityActivity}
              control={control}
              errors={errors}
              columns={2}
            />
          )}
          {watchActivityType === "Crop/Soil Analysis" && (
            <FormSection
              title="Crop Analysis"
              fields={fieldDefinitions.cropAnalysisActivity}
              control={control}
              errors={errors}
              columns={2}
            />
          )}
          <FormSection
            title=""
            fields={fieldDefinitions.generalActivityDetails2}
            control={control}
            errors={errors}
            columns={1}
          />
          <FormSection
            title=""
            fields={fieldDefinitions.generalActivityDetails3}
            control={control}
            errors={errors}
            columns={1}
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
