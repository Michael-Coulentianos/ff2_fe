import { useEffect, useState } from "react";
import { Grid, DialogContent, DialogActions, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import FormSection from "../molecules/DynamicFormSection";
import DynamicFormDialog from "../molecules/dialog";
import { Delete } from "@mui/icons-material";
import { processProperties } from "../../utils/Utilities";

const validationSchema = yup.object({
  title: yup.string().optional(),
  noteTypeId: yup.number().optional(),
  noteType: yup.string().optional(),
  partyId: yup.number().optional(),
  description: yup.string().required(),
  createdDate: yup.string().optional(),
  attachment: yup.string().optional(),
  location: yup.string().optional(),
  severityType: yup.string().optional(),
  severitySubType: yup.string().optional(),
  cropType: yup.string().optional(),
  yieldEstimateHeads: yup.string().optional(),
  yieldEstimateRowWidth: yup.string().optional(),
  yieldEstimateGrams: yup.string().optional(),
  cropAnalysisType: yup.string().optional(),
  cropSubType: yup.string().optional(),
  severityScale: yup.string().optional(),
});

const NotesDialog = ({
  isOpen,
  onClose,
  onSubmit,
  noteTypes,
  formData,
  handleDelete,
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
  });

  const [file, setFile] = useState<File | null>(null);

  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    lat: -30.559482,
    lng: 22.937506,
  });

  const [address, setAddress] = useState<string>("");

  const handleLocationSelect = (location: { lat: number; lng: number }) => {
    setPosition(location);
    if (window.google) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location }, (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK && results && results[0]) {
          const formattedAddress = results[0].formatted_address;
          setAddress(formattedAddress);
          setValue("location", formattedAddress);
        } else {
          console.error("Geocode failed:", status);
        }
      });
    }
  };

  const onSubmit2 = (data) => {
    data.attachment = file;
    console.log("Form data submitted in NotesDialog:", data);
    onSubmit(data);
  };


  const formatDate = (dateStr) => {
    if (!dateStr) return ""; // Return empty string if dateStr is undefined, null, or empty
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat("en-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(date);
  };

  useEffect(() => {
    if (onClose && formData) {
      const noteProperty = JSON.parse(formData.noteProperty || "{}");

      const initialPosition = formData.position || {
        lat: -30.559482,
        lng: 22.937506,
      };
      setPosition(initialPosition);

      const initialAddress = formData.location || "";
      setAddress(initialAddress);

      const initialValues = {
        ...formData,
        location: formData.location,
        severityType: noteProperty.severityType,
        severitySubType: noteProperty.severitySubType,
        cropType: noteProperty.cropType,
        yieldEstimateHeads: noteProperty.yieldEstimateHeads,
        yieldEstimateRowWidth: noteProperty.yieldEstimateRowWidth,
        yieldEstimateGrams: noteProperty.yieldEstimateGrams,
        cropAnalysisType: noteProperty.cropAnalysisType,
        cropSubType: noteProperty.cropSubType,
        severityScale: noteProperty.severityScale,
        createdDate: formatDate(formData.createdDate),
      };
      reset(initialValues);
    } else {
      // Set default values when no formData is provided
      reset({
        title: "",
        description: "",
        createdDate: "",
        attachment: "",
        location: "",
        severityType: "",
        severitySubType: "",
        cropType: "",
        noteType: noteTypes.length > 0 ? noteTypes[0].name : "",
        yieldEstimateHeads: "",
        yieldEstimateRowWidth: "",
        yieldEstimateGrams: "",
        cropAnalysisType: "",
        cropSubType: "",
        severityScale: "",
      });

      // Check if the browser supports Geolocation API
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setPosition({ lat: latitude, lng: longitude });

            if (window.google) {
              const geocoder = new window.google.maps.Geocoder();
              geocoder.geocode(
                { location: { lat: latitude, lng: longitude } },
                (results, status) => {
                  if (
                    status === window.google.maps.GeocoderStatus.OK &&
                    results &&
                    results[0]
                  ) {
                    const formattedAddress = results[0].formatted_address;
                    setAddress(formattedAddress);
                    setValue("location", formattedAddress);
                  } else {
                    console.error("Geocode failed:", status);
                  }
                }
              );
            }
          },
          (error) => {
            console.error("Error getting current location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    }
  }, [formData, isOpen, reset, noteTypes, setValue]);

  const noteTypeId = watch("noteTypeId");

  const [dynamicFields, setDynamicFields] = useState<any[]>([]);

  useEffect(() => {
    if (noteTypeId) {
      const selectedType = noteTypes.find(
        (type) => type.noteTypeId === noteTypeId
      );

      if (selectedType && selectedType.properties) {
        const properties = JSON.parse(selectedType.properties);
        const dynamicNoteTypes = processProperties(properties);

        setDynamicFields(dynamicNoteTypes);
      } else {
        setDynamicFields([]);
      }
    }
  }, [noteTypeId, noteTypes]);
  
  const fieldDefinitions = {
    generalNoteDetails: [
      { id: "title", label: "Note Title", type: "text" },
      {
        id: "noteTypeId",
        label: "Note Type",
        type: "select",
        options: noteTypes?.map((type) => ({
          label: type.name,
          value: type.noteTypeId,
        })),
      },
    ],
    generalNoteDetails0: [
      { id: "description", label: "Description", type: "multiText" },
      { id: "googleMapsSearch", label: "Search Map", type: "googleMapsSearch" },
    ],
    generalNoteDetails3: [
      { id: "attachment1", label: "Add file", type: "attachment" },
    ]
  };

  const formContent = (
    <form onSubmit={handleSubmit(onSubmit2)}>
      <DialogContent dividers sx={{ pt: 1, pb: 1 }}>
        <Grid container spacing={2} sx={{ padding: 2 }}>
          <FormSection
            fields={fieldDefinitions.generalNoteDetails}
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
            fields={fieldDefinitions.generalNoteDetails0}
            control={control}
            errors={errors}
            columns={1}
            onLocationSelect={handleLocationSelect}
            initialLocation={position}
            initialAddress={address}
          />

          <FormSection
            fields={fieldDefinitions.generalNoteDetails3}
            control={control}
            errors={errors}
            columns={1}
            onFileChange={setFile}
          />
        </Grid>
      </DialogContent>

      <DialogActions>
        {formData && (
          <Button
            variant="outlined"
            color="primary"
            startIcon={<Delete />}
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}
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
      title={formData ? "Update Note" : "Add Note"}
      formContent={formContent}
    />
  );
};

export default NotesDialog;