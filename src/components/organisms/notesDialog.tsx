import React, { useState, useEffect, ChangeEvent } from "react";
import { NoteType } from '../../models/noteType.interface';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Container,
  IconButton,
  Grid,
  styled,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Dialog
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextBox from "../atom/textBox";
import { createNote, getNoteTypes } from "../../apiService";

export const validationSchema = yup.object().shape({
  noteType: yup.string().required("This field is required"),
  title: yup.string().required("This field is required"),
  date: yup.string().required("This field is required"),
  map: yup.string().required("This field is required"),
  description: yup.string().required("This field is required"),
  attachment: yup.string().required("This field is required"),
  riskPercentage: yup.string().required("This field is required"),
  infectionType: yup.string().required("This field is required"),
  phaseType: yup.string().required("This field is required"),
  soilType: yup.string().required("This field is required"),
  deficiencies: yup.string().required("This field is required"),
  damageType: yup.string().required("This field is required"),
});

type NoteTypes = "General" | "Infection" | "Crop Analysis" | "Damage";

interface FormProps {
  noteType: NoteTypes;
  title: string;
  date: Date;
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
  isEdit: boolean;
  onEdit?: any;
  onSubmit?: any;
}

interface Note {
  NoteTypeId: string;
  Title: string;
  PartyId: string;
  Location: string;
  Description: string;
  Attachment: any;
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
  isEdit,
  onEdit,
  onSubmit,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [noteTypes, setNoteTypes] = useState<NoteType[]>([]);
  const [selectedNoteType, setSelectedNoteType] = useState<string>("Default");

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
    // try {
    //   const response = await createNote(data);
    //   console.log(response.message);
    //   console.log("data note interface", data);

    //   const responseData = await response.json();

    //   if (!response.ok) {
    //     if (responseData.errors) {
    //       for (let key in responseData.errors) {
    //         setError(response, {
    //           type: "manual",
    //           message: responseData.errors[key],
    //         });
    //       }
    //     }
    //     throw new Error("Failed to create note");
    //   }
    //   alert("note created successfully");
    //   setModalOpen(false);
    //   reset();
    // } catch (error: any) {
    //   alert(error.message);
    // }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  //remove the below
  const [form, setForm] = useState<FormProps>({
    noteType: "General",
    title: "",
    date: new Date(),
    map: "",
    description: "",
    attachment: null,
  });

  //remove the above

  return (
    <>
      {isEdit && (
        <IconButton onClick={onEdit}>
          <EditIcon />
        </IconButton>
      )}
      <Container>
        {!isEdit && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => setModalOpen(true)}
          >
            Add
          </Button>
        )}
        <MuiDialog
          onClose={handleCloseModal}
          aria-labelledby="customized-dialog-title"
          open={modalOpen}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <Grid container direction="row">
              <Grid item xs={12}>
                Note
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
                  {}
                  <Controller
                    name="noteType"
                    control={control}
                    render={({ field }) => (
                      <Select
                        {...field}
                        label="Note Type"
                        error={!!errors.noteType}
                        onChange={(event) => {
                          // Handle the select change
                          field.onChange(event.target.value);
                          setSelectedNoteType(event.target.value);
                        }}
                        fullWidth
                      >
                        {noteTypes.map((type) => (
                          <MenuItem key={type.noteTypeId} value={type.name}>
                            {type.name}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
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
                    defaultValue=""
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
                    name="map"
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <TextBox
                        {...field}
                        label="Map"
                        error={!!errors.map}
                        helperText={errors.map?.message}
                      />
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    defaultValue=""
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
                </Grid>
                <Grid item xs={6}>
                  {form.noteType === "Infection" && (
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
                  {form.noteType === "Crop Analysis" && (
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
                  {form.noteType === "Damage" && (
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
                  )}
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
                Add
              </Button>
            </DialogActions>
          </form>
        </MuiDialog>
      </Container>
    </>
  );
};

export default NotesDialog;
