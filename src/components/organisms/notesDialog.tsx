import React, { useEffect, useState } from "react";
import {
  Container,
  IconButton,
  Grid,
  styled,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { NoteType } from "../../models/noteType.interface";
import FormSection from "../molecules/DynamicFormSection";

const MuiDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const validationSchema = yup.object({
  title: yup.string().optional(),//required("This field is required"),
  noteType: yup.string().optional(),//required("This field is required"),
  noteTypeId: yup.number().optional(),
  party: yup.string().optional(),
  partyId: yup.number().optional(),
  description: yup.string().optional(),//required("This field is required"),
  date: yup.string().optional(),//required("This field is required"),
  attachment: yup.string().optional(),
  location: yup.string().optional(),//.required("This field is required"),
  severityType: yup.string().optional(),//.required("This field is required"),
  severitySubType: yup.string().optional(),//.required("This field is required"),
  cropType: yup.string().optional(),//.required("This field is required"),
  yieldEstimateHeads: yup.string().optional(),//.required("This field is required"),
  yieldEstimateRowWidth: yup.string().optional(),//.required("This field is required"),
  yieldEstimateGrams: yup.string().optional(),//.required("This field is required"),
  cropAnalysisType: yup.string().optional(),//required("This field is required"),
  cropSubType: yup.string().optional(),//.required("This field is required"),
  severityScale: yup.string().optional(),//.required("This field is required"),
});


const NotesDialog = ({
  isOpen,
  onClose,
  onSubmit,
  noteTypes,
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
      noteType: noteTypes.length > 0 ? noteTypes[0].name : '', 
      noteTypeId: noteTypes.length > 0 ? noteTypes[0].noteTypeId : '',
      yieldEstimateHeads: "",
      yieldEstimateRowWidth: "",
      yieldEstimateGrams: "",
      cropAnalysisType: "",
      cropSubType: "",
      severityScale: "",
    },
  });

  const watchNoteType = watch("noteType");
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
          { id: 4, label: "Animal" }
        ]; 
      case "Infection":
        return [
          { id: 1, label: "Insects" },
                { id: 2, label: "Nematodes" },
                { id: 3, label: "Fungus" },
                { id: 4, label: "Pest" },
                { id: 5, label: "Bacteria" },
                { id: 6, label: "Virus" }
        ];
      case "Water":
        return [
          { id: 1, label: "Logging" },
          { id: 2, label: "Damage" },
          { id: 3, label: "Shortage" }
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
                { id: 6, label: "Harvest" }
        ]; 
      case "Soil type":
        return [
          { id: 1, label: "Clay" },
                { id: 2, label: "Sandy" },
                { id: 3, label: "Silt" },
                { id: 4, label: "Loamy" },
                { id: 5, label: "Peaty" },
                { id: 6, label: "Chalky" }
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
                { id: 10, label: "Zinc(Zn)" }
        ];
      default:
        return []; // Default empty options
    }
  }

  useEffect(() => {
    if (isOpen && formData) {
      reset({
        //...defaultValues,
        ...formData,
        noteType: formData.noteType || noteTypes[0]?.name,
        noteTypeId: formData.noteTypeId || noteTypes.find(nt => nt.name === formData.noteType)?.noteTypeId,
        party: formData.party || (organizations.length > 0 ? organizations[0].name : ''),
        partyId: formData.partyId || organizations.find(org => org.name === formData.party)?.partyId
      });
      setValue('noteTypeId', noteTypes.find(nt => nt.name === watchNoteType)?.noteTypeId);
      setValue('partyId', organizations.find(nt => nt.name === watchParty)?.partyId);
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
        noteType: noteTypes.length > 0 ? noteTypes[0].name : '', 
        noteTypeId: noteTypes.length > 0 ? noteTypes[0].noteTypeId : '',
        yieldEstimateHeads: "",
        yieldEstimateRowWidth: "",
        yieldEstimateGrams: "",
        cropAnalysisType: "",
        cropSubType: "",
        severityScale: "",
      });
     }
  }, [formData, isOpen, reset, noteTypes, setValue, watchNoteType, watchParty, organizations]);

  const fieldDefinitions = {
    generalNoteDetails: [
      { id: "title", label: "Note Title", type: "text" },
      {
        id: "party",
        label: "Organization",
        type: "select",
        options: organizations?.map(org => ({
          label: org.name,
          value: org.name, 
        })),
        onChange: (e) => {
          const selectedName = e.target.value; 
          const foundOrg = organizations.find(org => org.name === selectedName);
          if (foundOrg) {
            setValue('partyId', foundOrg.partyId);
            setValue('party', foundOrg.name);
          } else {
            console.error('Selected organization not found:', selectedName);
          }
        }
      },
    ],
    generalNoteDetails0: [
      { id: "description", label: "Description", type: "multiText" },
    ],
    generalNoteDetails1: [
      {
        id: "noteType",
        label: "Note Type",
        type: "select",
        options: noteTypes?.map((type) => ({
          label: type.name,
          value: type.name,
        })),
        onChange: (selectedName) => setValue('noteTypeId', noteTypes.find(nt => nt.name === selectedName)?.noteTypeId),
      },
      { id: "date", label: "Note Date", type: "date" },
    ],
    generalNoteDetails2: [
      { id: "location", label: "Location", type: "map" },
    ],
    generalNoteDetails3: [
      { id: "attachment", label: "Add file", type: "attachment" },
    ],
    severityNote: [
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
        options: options.map((type) => ({ label: type.label, value: type.label })),
      },
      { id: "severityScale", label: "Severity Scale (%)", type: "radioGroup" },
    ],
    yieldEstimateNote: [
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
      { id: "yieldEstimateGrams", label: "Grams per head/plant", type: "text" }
    ],
    cropAnalysisNote: [
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
        options: options2.map((type) => ({ label: type.label, value: type.label })),
      },
    ],
  };

  return (
    <Container>
      <MuiDialog onClose={onClose} open={isOpen} aria-labelledby="note-dialog-title">
        <DialogTitle id="note-dialog-title">{formData ? "Update Note" : "Add Note"}</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit((onSubmit))}>
          <DialogContent dividers sx={{ pt: 1, pb: 1 }}>
            <Grid container spacing={2} sx={{ padding: 2 }}>
                <FormSection
                  title=""
                  fields={fieldDefinitions.generalNoteDetails}
                  control={control}
                  errors={errors}
                  columns={2}
                />

                <FormSection
                  title=""
                  fields={fieldDefinitions.generalNoteDetails0}
                  control={control}
                  errors={errors}
                  columns={1}
                />

                <FormSection
                  title=""
                  fields={fieldDefinitions.generalNoteDetails1}
                  control={control}
                  errors={errors}
                  columns={2}
                />

                {watchNoteType === "Yield Estimate" && (
                  <FormSection
                    title="Yield Estimate"
                    fields={fieldDefinitions.yieldEstimateNote}
                    control={control}
                    errors={errors}
                    columns={2}
                  />
                )}
                {watchNoteType === "Damage" && (
                  <FormSection
                    title="Severity Note"
                    fields={fieldDefinitions.severityNote}
                    control={control}
                    errors={errors}
                    columns={2}
                  />
                )}
                {watchNoteType === "Crop/Soil Analysis" && (
                  <FormSection
                    title="Crop Analysis"
                    fields={fieldDefinitions.cropAnalysisNote}
                    control={control}
                    errors={errors}
                    columns={2}
                  />
                )}
                {/* <FormSection
                  title=""
                  fields={fieldDefinitions.generalNoteDetails2}
                  control={control}
                  errors={errors}
                  columns={1}
                /> */}
                <FormSection
                  title=""
                  fields={fieldDefinitions.generalNoteDetails3}
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
      </MuiDialog>
    </Container>
  );
};

export default NotesDialog;
