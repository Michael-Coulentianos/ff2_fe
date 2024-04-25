import React, { useEffect, useState } from "react";
import {
  TextField, MenuItem, Container, IconButton, Grid, styled, DialogTitle,
  DialogContent, DialogActions, Button, Dialog
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import TextBox from "../atom/textBox";
import { NoteType } from '../../models/noteType.interface';
import { getNoteTypes } from "../../apiService";

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
  noteType: yup.string().required("Note type is required"),
  riskPercentage: yup.string().required("Note type is required"),
  infectionType: yup.string().required("Note type is required"),
});

interface FormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: any) => void;
  formData?: any;
}

const FormDialog: React.FC<FormDialogProps> = ({
  isOpen,
  onClose,
  onSubmit,
  formData
}) => {
  const [noteTypes, setNoteTypes] = useState<NoteType[]>([]);
  const [selectedNoteType, setSelectedNoteType] = useState<string>();
  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      title: "",
      location: "",
      description: "",
    }
  });

  useEffect(() => {
    const fetchNoteTypes = async () => {
      try {
        const fetchedNoteTypes = await getNoteTypes();
        setNoteTypes(fetchedNoteTypes);
        setSelectedNoteType(fetchedNoteTypes.length > 0 ? fetchedNoteTypes[0].name : '');
        if (!formData) {
          reset({
            title: "",
            location: "",
            description: "",
            noteType: ""
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

  return (
    <Container>
      <MuiDialog onClose={onClose} open={isOpen}>
        <DialogTitle>{formData ? "Update Note" : "Add Note"}</DialogTitle>
        <IconButton aria-label="close" onClick={onClose} sx={{ position: "absolute", right: 10, top: 10, color: (theme) => theme.palette.grey[500] }}>
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit((data) => { onSubmit(data); onClose(); })}>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => <TextBox {...field} label="Title" error={!!errors.title} helperText={errors.title?.message} />}
                />
                <Controller
                  name="noteType"
                  control={control}
                  render={({ field }) => (
                    <TextField {...field} select label="Note Type" fullWidth margin="dense" onChange={(e) => field.onChange(e.target.value)}>
                      {noteTypes.map((type) => (
                        <MenuItem key={type.noteTypeId} value={type.noteTypeId}>
                          {type.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  )}
                />
                <Controller
                  name="location"
                  control={control}
                  render={({ field }) => <TextBox {...field} label="Location" error={!!errors.location} helperText={errors.location?.message} />}
                />
                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => <TextBox {...field} label="Description" error={!!errors.description} helperText={errors.description?.message} multiline rows={4} />}
                />
                {selectedNoteType === "Infection" && (
                    <>
                      <Controller
                        name="riskPercentage"
                        control={control}
                        render={({ field }) => <TextBox {...field} label="Risk Percentage" error={!!errors.riskPercentage} helperText={errors.riskPercentage?.message} />}
                      />
                      <Controller
                        name="infectionType"
                        control={control}
                        render={({ field }) => <TextBox {...field} label="Infection Type" error={!!errors.infectionType} helperText={errors.infectionType?.message} />}
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
              startIcon={<SaveIcon />}>
              {formData ? "Update" : "Save"}
            </Button>
          </DialogActions>
        </form>
      </MuiDialog>
    </Container>
  );
};

export default FormDialog;
