import React, { useState, useEffect, ChangeEvent } from "react";
import { NoteType } from '../../models/noteType.interface';
import {
  TextField, FormHelperText, MenuItem, FormControl, InputLabel,Container, IconButton,
  Grid, styled, DialogTitle, DialogContent, DialogActions, Button, Dialog
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextBox from "../atom/textBox";
import { createNote, getNoteTypes } from "../../apiService";
import { Note } from "../../models/note.interface";

export const validationSchema = yup.object().shape({
  noteType: yup.object().shape({
    name: yup.string().required("Note type name is required"),
    noteTypeId: yup.number().required(),
    description: yup.string().required(),
    properties: yup.array().of(yup.mixed()).required()
  }),
  title: yup.string().required("This field is required"),
  date: yup.string().required("This field is required"),
  map: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  attachment: yup.string().required("This field is required"),
  // riskPercentage: yup.string().required("This field is required"),
  // infectionType: yup.string().required("This field is required"),
  // phaseType: yup.string().required("This field is required"),
  // soilType: yup.string().required("This field is required"),
  // deficiencies: yup.string().required("This field is required"),
  // damageType: yup.string().required("This field is required"),
});

interface FormProps {
  noteType: NoteType;
  title: string;
  date: string;
  map: string;
  description: string;
  attachment: File | null;
  riskPercentage?: number;
  infectionType?: string;
  phaseType?: string;
  soilType?: string;
  deficiencies?: string;
  damageType?: string;
}

interface NotesDialogProps {
  noteData?: Note;
  isEdit: boolean;
  onEdit?: any;
  onSubmit?: any;
}


const MuiDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const NotesDialog: React.FC<NotesDialogProps> = ({
  noteData,
  isEdit,
  onEdit,
  onSubmit,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const defaultValues = {
    noteType: {
      name: "General (default)",
      noteTypeId: 0,
      description: "",
      properties: []
    },
    title: "",
    date: new Date().toISOString().slice(0, 10),
    map: "",
    description: "",
    attachment: null, 
    // riskPercentage: "",
    // infectionType: "",
    // phaseType: "",
    // soilType: "",
    // deficiencies: "",
    // damageType: "",
  };
  

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
    //defaultValues: defaultValues,
  });

  useEffect(() => {
    if (isEdit && noteData) {
      setModalOpen(true);
      // reset({
      //   //noteTypeId: noteData.NoteType.noteTypeId,
      //   title: noteData.Title,
      //   date: noteData.Date || new Date().toISOString().slice(0, 10),
      //   map: noteData.Location,
      //   description: noteData.Description,
      //   attachment: noteData.Attachment || null,
      // });
    }
  }, [isEdit, noteData, reset]);

  const handleSave = async (data: Note) => {
    if (onSubmit) {
      onSubmit(data);
    }
    setModalOpen(false); // Close modal on save
    //reset(defaultValues); // Reset form to default values after save
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    //reset(defaultValues); // Reset the form when closing modal
  };

  const [noteTypes, setNoteTypes] = useState<NoteType[]>([]);
  const [selectedNoteType, setSelectedNoteType] = useState<string>();

  useEffect(() => {
    const fetchNoteTypes = async () => {
      try {
        const fetchedNoteTypes = await getNoteTypes();
        setNoteTypes(fetchedNoteTypes);
        setSelectedNoteType(fetchedNoteTypes[0].name); 
      } catch (error) {
        console.error("Failed to fetch note types:", error);
      }
    };

    fetchNoteTypes();
  }, []);

  const handleNoteTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedNoteType(event.target.value);
  };

  const onSave = async (data: Note) => {
    try {
      // console.log(data);

      // const response = await createNote(data);
      // console.log(response.message);
      // console.log("data note interface", data);

      // const responseData = await response.json();

      // if (!response.ok) {
      //   if (responseData.errors) {
      //     for (let key in responseData.errors) {
      //       setError(response, {
      //         type: "manual",
      //         message: responseData.errors[key],
      //       });
      //     }
      //   }
      //   throw new Error("Failed to create note");
      // }
      alert("note created successfully");
      setModalOpen(false);
      reset();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const today = new Date().toISOString().slice(0, 10);

  //remove the below
  const [form, setForm] = useState<FormProps>({
    noteType: {
      name: "General (default)",
      noteTypeId: 0,
      description: "",
      properties: []
    },
    title: "",
    date: today,
    map: "",
    description: "",
    attachment: null,
  });

  const handleButtonClick = () => {
    document.getElementById('file-input')?.click();
  };

  return (
    <>
      {isEdit && (
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
      )}
      <Container>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setModalOpen(true)}
        >
            {isEdit ? "Edit Note" : "Add Note"}
        </Button>
        <MuiDialog
          onClose={handleCloseModal}
          aria-labelledby="customized-dialog-title"
          open={modalOpen}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <Grid container direction="row">
              <Grid item xs={12}>
              {isEdit ? "Edit Note" : "Add Note"}
              </Grid>
            </Grid>
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCloseModal}
            size="small"
            sx={{
              position: "absolute",
              right: 10,
              top: 15,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <form onSubmit={handleSubmit(() => onSave)}>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                <Controller
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
                      <TextField
                        {...field}
                        type="date"
                        fullWidth
                        variant="outlined"
                        margin="dense"
                        error={!!errors.date}
                        helperText={errors.date?.message}
                      />
                    )}
                  />
                <Controller
                  name="noteType"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      select
                      fullWidth
                      label="Note Type"
                      value={selectedNoteType}
                      onChange={handleNoteTypeChange}
                      margin="dense"
                    >
                      {noteTypes.map((type) => (
                        <MenuItem key={type.noteTypeId} value={type.name}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        fullWidth
                        multiline
                        margin="dense"
                        rows={4}
                        label="Description"
                        error={!!errors.description}
                        helperText={errors.description?.message}
                      />
                    )}
                  />

              <Controller
              
                    name="attachment"
                    control={control}
                    //defaultValue={null}  // Ensure the default value is consistent with the input type
                    render={({ field: { onChange, onBlur, value, name, ref } }) => (
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12}>
                          <input
                            id="file-input"
                            type="file"
                            ref={ref}
                            name={name}
                            style={{ display: 'none' }}  // Hide the actual input element
                            onChange={(e) => {
                              // Update the form state when a file is selected
                              const file = e.target.files ? e.target.files[0] : null;
                              onChange(file);
                            }}
                            onBlur={onBlur}
                          />
                          <FormControl fullWidth error={!!errors.attachment}>
                            <InputLabel shrink htmlFor="file-input">
                              Attach file
                            </InputLabel>
                            <Button
                              variant="contained"
                              component="span"
                              onClick={handleButtonClick}
                              style={{ marginTop: 8 }} // Add margin for spacing between the label and button
                            >
                              Upload File
                            </Button>
                            {errors.attachment && (
                              <FormHelperText>{errors.attachment.message}</FormHelperText>
                            )}
                          </FormControl>
                        </Grid>
                      </Grid>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  
                  
                  <Controller
                    name="map"
                    control={control}
                    render={({ field }) => (
                      <TextBox
                        {...field}
                        label="Map"
                        error={!!errors.map}
                        helperText={errors.map?.message}
                      />
                    )}
                  />
                  
                  
                </Grid>
                <Grid item xs={6}>
                  {/* {form.noteType.name === "Infection" && (
                    <>
                      <Controller
                        name="riskPercentage"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextBox
                            {...field}
                            label="Risk Percentage"
                            error={!!errors.riskPercentage}
                            helperText={errors.riskPercentage?.message}
                          />
                        )}
                      />

                      <Controller
                        name="infectionType"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextBox
                            {...field}
                            label="Infection Type"
                            error={!!errors.infectionType}
                            helperText={errors.infectionType?.message}
                          />
                        )}
                      />
                    </>
                  )}
                  {form.noteType.name === "Crop Analysis" && (
                    <>
                      <Controller
                        name="phaseType"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextBox
                            {...field}
                            label="Phase Type"
                            error={!!errors.phaseType}
                            helperText={errors.phaseType?.message}
                          />
                        )}
                      />

                      <Controller
                        name="soilType"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextBox
                            {...field}
                            label="Soil Type"
                            error={!!errors.soilType}
                            helperText={errors.soilType?.message}
                          />
                        )}
                      />

                      <Controller
                        name="deficiencies"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextBox
                            {...field}
                            label="Deficiencies"
                            error={!!errors.deficiencies}
                            helperText={errors.deficiencies?.message}
                          />
                        )}
                      />
                    </>
                  )}
                  {form.noteType.name === "Damage" && (
                    <>
                      <Controller
                        name="riskPercentage"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextBox
                            {...field}
                            label="Risk Percentage"
                            error={!!errors.riskPercentage}
                            helperText={errors.riskPercentage?.message}
                          />
                        )}
                      />

                      <Controller
                        name="damageType"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                          <TextBox
                            {...field}
                            label="Damage Type"
                            error={!!errors.damageType}
                            helperText={errors.damageType?.message}
                          />
                        )}
                      />
                    </>
                  )} */}
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
                {isEdit ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </form>
        </MuiDialog>
      </Container>
    </>
  );
};

export default NotesDialog;
