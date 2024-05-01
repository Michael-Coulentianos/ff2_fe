import React, { useEffect, useState } from "react";
import {
  MenuItem,
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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import TextBox from "../atom/textBox";
import { NoteType } from "../../models/noteType.interface";
import { getNoteTypes } from "../../apiService";
import MapComponent from "./locationMap";
import AddAttachmentButton from "../atom/attachmentButton";
import ColoredRadio from "../molecules/coloredRadioBtns";
import FormSection from "../atom/FormSection";

const MuiDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const validationSchema = yup.object({
  title: yup.string().required("This field is required"),
  noteType: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  date: yup.string().required("This field is required"),
  attachment: yup.string().required("This field is required"),
  location: yup.string().required("This field is required"),
  severityType: yup.string().required("This field is required"),
  severitySubType: yup.string().required("This field is required"),
  cropType: yup.string().required("This field is required"),
  yieldEstimateHeads: yup.string().required("This field is required"),
  yieldEstimateRowWidth: yup.string().required("This field is required"),
  yieldEstimateGrams: yup.string().required("This field is required"),
  cropAnalysisType: yup.string().required("This field is required"),
  cropSubType: yup.string().required("This field is required"),
  severityScale: yup.string().required("This field is required"),
});

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData) => void;
  formData?: any;
}

const NotesDialog: React.FC<FormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData,
}) => {
  const [noteTypes, setNoteTypes] = useState<NoteType[]>([]);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      noteType: "Default",
      description: "",
      date: "",
      attachment: "",
      location: "",
      severityType: "",
      severitySubType: "",
      cropType: "",
      yieldEstimateHeads: "",
      yieldEstimateRowWidth: "",
      yieldEstimateGrams: "",
      cropAnalysisType: "",
      cropSubType: "",
      severityScale: "",
    },
  });

  const watchNoteType = watch("noteType");
  const watchseverityType = watch("severityType");
  const watchcropAnalysisType = watch("cropAnalysisType");

  useEffect(() => {
    const fetchNoteTypes = async () => {
      try {
        const fetchedNoteTypes = await getNoteTypes();
        setNoteTypes(fetchedNoteTypes);

        if (isOpen && formData) {
          const initialValues = {
            ...formData,
            title: "",
            noteType: "Default",
            description: "",
            date: "",
            attachment: "",
            location: "",
            severityType: "",
            severitySubType: "",
            cropType: "",
            yieldEstimateHeads: "",
            yieldEstimateRowWidth: "",
            yieldEstimateGrams: "",
            cropAnalysisType: "",
            cropSubType: "",
            severityScale: "",
          };
          fetchNoteTypes();
          reset(initialValues);
        }
      } catch (error) {
        console.error("Failed to fetch note types:", error);
      }
    };
  }, [formData, isOpen, reset]);

  const fieldDefinitions = {
    generalNoteDetails: [
      {
        id: "noteType",
        label: "Note Type",
        type: "select",
        options: noteTypes?.map((entity) => ({
          label: entity.name,
          value: entity.noteTypeId,
        })),
      },
      { id: "title", label: "Note Title", type: "text" },
      { id: "description", label: "Description", type: "multiText" },
      { id: "date", label: "Note Date", type: "date" },
    ],
    generalNoteDetails2: [
      { id: "attachment", label: "Add file", type: "attachment" },
      { id: "location", label: "Location", type: "map" },
    ],
    severityNote: [
      {
        id: "severityType",
        label: "Severity Type",
        type: "select",
        options: [
          { id: 1, value: "Damage" },
          { id: 2, value: "Infection" },
          { id: 3, value: "Water" },
        ].map((type) => ({ label: type.value, value: type.id })),
      },
      {
        id: "severitySubType",
        label: "Sub-Type",
        type: "select",
        options: (
          <>
            {watchseverityType === "Damage" &&
              [
                { id: 1, value: "UV" },
                { id: 2, value: "Hail" },
                { id: 3, value: "Wind" },
                { id: 4, value: "Animal" },
              ]?.map((type) => ({
                label: type.value,
                value: type.id,
              }))}

            {watchseverityType === "Infection" &&
              [
                { id: 1, value: "Insects" },
                { id: 2, value: "Nematodes" },
                { id: 3, value: "Fungus" },
                { id: 4, value: "Pest" },
                { id: 5, value: "Bacteria" },
                { id: 6, value: "Virus" },
              ]?.map((type) => ({
                label: type.value,
                value: type.id,
              }))}

            {watchseverityType === "Water" &&
              [
                { id: 1, value: "Logging" },
                { id: 2, value: "Damage" },
                { id: 3, value: "Shortage" },
              ]?.map((type) => ({
                label: type.value,
                value: type.id,
              }))}
          </>
        ),
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
    ],
    yieldEstimateCalculation: [
      { id: "yieldEstimateHeads", label: "Heads/Plants per 10m", type: "text" },
      { id: "yieldEstimateRowWidth", label: "Row Width", type: "text" },
      { id: "yieldEstimateGrams", label: "Grams per head/plant", type: "text" },
    ],
    cropAnalysisNote: [
      {
        id: "cropAnalysisType",
        label: "cropAnalysisType",
        type: "select",
        options: [
          { id: 1, value: "Phenological phase" },
          { id: 2, value: "Soil type" },
          { id: 3, value: "Deficiency type" },
        ].map((type) => ({
          label: type.value,
          value: type.id,
        })),
      },
      {
        id: "cropSubType",
        label: "Sub-Type",
        type: "select",
        options: (
          <>
            {watchcropAnalysisType === "Phenological phase" &&
              [
                { id: 1, value: "Germination" },
                { id: 2, value: "Vegetative Stage" },
                { id: 3, value: "Reproductive Stage" },
                { id: 4, value: "Maturity" },
                { id: 5, value: "Senescence" },
                { id: 6, value: "Harvest" },
              ].map((type) => ({
                label: type.value,
                value: type.id,
              }))}
            {watchcropAnalysisType === "Soil type" &&
              [
                { id: 1, value: "Clay" },
                { id: 2, value: "Sandy" },
                { id: 3, value: "Silt" },
                { id: 4, value: "Loamy" },
                { id: 5, value: "Peaty" },
                { id: 6, value: "Chalky" },
              ].map((type) => ({
                label: type.value,
                value: type.id,
              }))}
            {watchcropAnalysisType === "Deficiency type" &&
              [
                { id: 1, value: "Calcium(Ca)" },
                { id: 2, value: "Nitrogen(N)" },
                { id: 3, value: "Phosphate(PO)" },
                { id: 4, value: "Sulphur(S)" },
                { id: 5, value: "Iron(fe)" },
                { id: 6, value: "Iron(fe)" },
                { id: 7, value: "Potassium(K)" },
                { id: 8, value: "Magnesium(Mg)" },
                { id: 9, value: "Manganese(Mn)" },
                { id: 10, value: "Zinc(Zn)" },
              ].map((type) => ({
                label: type.value,
                value: type.id,
              }))}
          </>
        ),
      },
    ],
  };

  return (
    <Container>
      <MuiDialog onClose={onClose} open={isOpen}>
        <DialogTitle>{formData ? "Update Note" : "Add Note"}</DialogTitle>
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
        <form
          onSubmit={handleSubmit((data) => {
            onSubmit(data);
            onClose();
          })}
        >
          <DialogContent dividers>
            <Grid container>
              <Grid item xs={12}>
                <FormSection
                  title=""
                  fields={fieldDefinitions.generalNoteDetails}
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
                <FormSection
                  title=""
                  fields={fieldDefinitions.generalNoteDetails2}
                  control={control}
                  errors={errors}
                  columns={1}
                />
              </Grid>
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
