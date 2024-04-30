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
  location: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  noteType: yup.string().required("This field is required"),
  riskPercentage: yup.string().required("This field is required"),
  infectionType: yup.string().required("This field is required"),
  subType: yup.string().required("This field is required"),
  attachment: yup.string().required("This field is required"),
  date: yup.string().required("This field is required"),
  severityType: yup.string().required("This field is required"),
  yieldEstimate: yup.string().required("This field is required"),
  cropType: yup.string().required("This field is required"),
  yieldEstimateHeads: yup.string().required("This field is required"),
  yieldEstimateRowWidth: yup.string().required("This field is required"),
  yieldEstimateGrams: yup.string().required("This field is required"),
  cropAnalysisType: yup.string().required("This field is required"),
  //: yup.string().required("This field is required"),
  //: yup.string().required("This field is required"),
  //: yup.string().required("This field is required"),
  //: yup.string().required("This field is required"),
  //: yup.string().required("This field is required"),
  //: yup.string().required("This field is required"),
  //: yup.string().required("This field is required"),
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
      location: "",
      description: "",
    },
  });

  useEffect(() => {
    const fetchNoteTypes = async () => {
      try {
        const fetchedNoteTypes = await getNoteTypes();
        setNoteTypes(fetchedNoteTypes);
console.log(fetchedNoteTypes,"ftech");

        if (!formData) {
          reset({
            title: "",
            date: "",
            location: "",
            description: "",
            noteType: "Default",
          });
        }
      } catch (error) {
        console.error("Failed to fetch note types:", error);
      }
    };

    if (isOpen) {
      fetchNoteTypes();
      reset(formData);
    }
  }, [formData, isOpen, reset]);

  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const handleAttachmentClick = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      setSelectedFileName(selectedFile.name);
    }
  };

  const watchNoteType = watch("noteType");
  const watchseverityType = watch("severityType");
  const watchcropAnalysisType = watch("cropAnalysisType");
  const watchYieldEstimate = watch("yieldEstimate");

console.log(noteTypes);

  const fieldDefinitions = {
    generalNoteDetails: [
      {
        id: "noteType",
        label: "Note Type",
        type: "select",
        options: ["Default", "Severity", "Yield Estimate", "Crop Analysis"].map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        )),
      },
      { id: "title", label: "Note Title", type: "text" },
      { id: "description", label: "Description", type: "text" },
      { id: "date", label: "Note Date", type: "text" },
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
        options: ["Damage", "Infection", "Water"].map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        )),
      },
      {
        id: "subType",
        label: "Sub-Type",
        type: "select",
        options: (
          <>
            {watchseverityType === "Damage" &&
              ["UV", "Hail", "Wind", "Animal"].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}

            {watchseverityType === "Infection" &&
              [
                "Insects",
                "Nematodes",
                "Fungus",
                "Pest",
                "Bacteria",
                "Virus",
              ].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}

            {watchseverityType === "Water" &&
              ["Logging", "Damage", "Shortage"].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
          </>
        ),
      },
      { id: "severityScale", label: "Severity Scale (%)", type: "radioGroup" },
    ],
    yieldEstimateNote: [
      { id: "description", label: "Description", type: "text" },
      {
        id: "cropType",
        label: "Note Date",
        type: "select",
        options: [
          "Yellow Maize",
          "White Maize",
          "Soybeans",
          "Dry beans",
          "Sugarcane",
          "Wheat",
          "Barley",
          "Tabaco",
          "Potatoes",
          "Cotton",
          "Sunflower",
        ].map((type) => (
          <MenuItem key={type} value={type}>
            {type}
          </MenuItem>
        )),
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
        options: ["Phenological phase", "Soil type", "Deficiency type"].map(
          (type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          )
        ),
      },
      {
        id: "subType",
        label: "Sub-Type",
        type: "select",
        options: (
          <>
            {watchcropAnalysisType === "Phenological phase" &&
              [
                "Germination",
                "Vegetative Stage",
                "Reproductive Stage",
                "Maturity",
                "Senescence",
                "Harvest",
              ].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            {watchcropAnalysisType === "Soil type" &&
              ["Clay", "Sandy", "Silt", "Loamy", "Peaty", "Chalky"].map(
                (type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                )
              )}
            {watchcropAnalysisType === "Deficiency type" &&
              [
                "Calcium(Ca)",
                "Nitrogen(N)",
                "Phosphate(PO)",
                "Sulphur(S)",
                "Iron(fe)",
                "Potassium(K)",
                "Magnesium(Mg)",
                "Manganese(Mn)",
                "Zinc(Zn)",
              ].map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
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
                  title="Note Details"
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
                {/* <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <TextBox
                      {...field}
                      label="Title"
                      error={!!errors.title}
                      helperText={errors.title?.message}
                    />
                  )}
                />
                <Controller
                  name="date"
                  control={control}
                  render={({ field }) => (
                    <TextBox
                      {...field}
                      label="Date"
                      error={!!errors.date}
                      helperText={errors.date?.message}
                    />
                  )}
                />
                <Controller
                  name="noteType"
                  control={control}
                  render={({ field }) => (
                    <TextBox
                      {...field}
                      select
                      label="Note Type"
                      onChange={(e) => field.onChange(e.target.value)}
                    >
                      {noteTypes.map((type) => (
                        <MenuItem key={type.noteTypeId} value={type.name}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </TextBox>
                  )}
                />
                {watchNoteType === "Damage" && (
                  <>
                    <Controller
                      name="severityType"
                      control={control}
                      render={({ field }) => (
                        <TextBox
                          {...field}
                          select
                          label="Severity Type"
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {["Damage", "Infection", "Water"].map((type) => (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </TextBox>
                      )}
                    />
                    <Controller
                      name="subType"
                      control={control}
                      render={({ field }) => (
                        <TextBox
                          {...field}
                          select
                          label="Sub-Type"
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {watchseverityType === "Damage" &&
                            ["UV", "Hail", "Wind", "Animal"].map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}

                          {watchseverityType === "Infection" &&
                            [
                              "Insects",
                              "Nematodes",
                              "Fungus",
                              "Pest",
                              "Bacteria",
                              "Virus",
                            ].map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}

                          {watchseverityType === "Water" &&
                            ["Logging", "Damage", "Shortage"].map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                        </TextBox>
                      )}
                    />
                    <ColoredRadio></ColoredRadio>
                  </>
                )}
                {watchNoteType === "Yield Estimate" && (
                  <>
                    <Controller
                      name="cropType"
                      control={control}
                      render={({ field }) => (
                        <TextBox
                          {...field}
                          select
                          label="Sub-Type"
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {[
                            "Yellow Maize",
                            "White Maize",
                            "Soybeans",
                            "Dry beans",
                            "Sugarcane",
                            "Wheat",
                            "Barley",
                            "Tabaco",
                            "Potatoes",
                            "Cotton",
                            "Sunflower",
                          ].map((type) => (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </TextBox>
                      )}
                    />
                    <Controller
                      name="yieldEstimateHeads"
                      control={control}
                      render={({ field }) => (
                        <TextBox
                          {...field}
                          label="Heads/Plants per 10m"
                          error={!!errors.yieldEstimate}
                          helperText={errors.yieldEstimate?.message}
                        />
                      )}
                    />
                    <Controller
                      name="yieldEstimateRowWidth"
                      control={control}
                      render={({ field }) => (
                        <TextBox
                          {...field}
                          label="Row Width"
                          error={!!errors.yieldEstimate}
                          helperText={errors.yieldEstimate?.message}
                        />
                      )}
                    />
                    <Controller
                      name="yieldEstimateGrams"
                      control={control}
                      render={({ field }) => (
                        <TextBox
                          {...field}
                          label="Grams per head/plant"
                          error={!!errors.yieldEstimate}
                          helperText={errors.yieldEstimate?.message}
                        />
                      )}
                    />
                  </>
                )}
                {watchNoteType === "Crop/Soil Analysis" && (
                  <>
                    <Controller
                      name="cropAnalysisType"
                      control={control}
                      render={({ field }) => (
                        <TextBox
                          {...field}
                          select
                          label="Analysis-Type"
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {[
                            "Phenological phase",
                            "Soil type",
                            "Deficiency type",
                          ].map((type) => (
                            <MenuItem key={type} value={type}>
                              {type}
                            </MenuItem>
                          ))}
                        </TextBox>
                      )}
                    />
                    <Controller
                      name="cropAnalysisType"
                      control={control}
                      render={({ field }) => (
                        <TextBox
                          {...field}
                          select
                          label="Sub-Type"
                          onChange={(e) => field.onChange(e.target.value)}
                        >
                          {watchcropAnalysisType === "Phenological phase" &&
                            [
                              "Germination",
                              "Vegetative Stage",
                              "Reproductive Stage",
                              "Maturity",
                              "Senescence",
                              "Harvest",
                            ].map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          {watchcropAnalysisType === "Soil type" &&
                            [
                              "Clay",
                              "Sandy",
                              "Silt",
                              "Loamy",
                              "Peaty",
                              "Chalky",
                            ].map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          {watchcropAnalysisType === "Deficiency type" &&
                            [
                              "Calcium(Ca)",
                              "Nitrogen(N)",
                              "Phosphate(PO)",
                              "Sulphur(S)",
                              "Iron(fe)",
                              "Potassium(K)",
                              "Magnesium(Mg)",
                              "Manganese(Mn)",
                              "Zinc(Zn)",
                            ].map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                        </TextBox>
                      )}
                    />
                  </>
                )}
                <Controller
                  name="location"
                  control={control}
                  render={() => (
                    <MapComponent
                      label="Location"
                      error={!!errors.location}
                      helperText={errors.location?.message}
                    />
                  )}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextBox
                      {...field}
                      label="Description"
                      error={!!errors.description}
                      helperText={errors.description?.message}
                      multiline
                      rows={4}
                    />
                  )}
                />
                <Grid
                  container
                  sx={{
                    marginTop: 1,
                  }}
                >
                  <Grid item xs={8}>
                    <Controller
                      name="attachment"
                      control={control}
                      render={({ field }) => (
                        <TextBox
                          {...field}
                          label="Attachment"
                          value={selectedFileName}
                        />
                      )}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={4}
                    sx={{
                      marginTop: 1,
                      paddingLeft: 1,
                    }}
                  >
                    <AddAttachmentButton
                      onClick={() => handleAttachmentClick}
                    />
                  </Grid>
                </Grid> */}
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
