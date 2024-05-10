import React, { useState, useEffect } from "react";
import {
  Button,
  IconButton,
  Grid,
  styled,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import FormSection from "../molecules/DynamicFormSection";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { updateUserProfile, getUserProfile } from "../../apiService";
import { UserProfile } from "../../models/UserProfile.interface";

const validationSchema = yup.object({
  givenName: yup.string().required("Given Name is required"),
  surname: yup.string().required("Surname is required"),
  displayName: yup.string().required("Display Name is required"),
  mobilePhone: yup
    .string()
    .required("Mobile Phone is required")
    .min(10, "Mobile Phone must be at least 10 digits"),
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const UserProfileForm = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [modalOpen, setModalOpen] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const fetchUserProfile = async () => {
      const data = await getUserProfile();
      setUserProfile(data);
      reset(data); // Pre-fill the form with fetched data
    };
    fetchUserProfile();
  }, [reset]);

  const handleFormSubmit = async (data) => {
    try {
      data.azureUserId = userProfile ? userProfile?.userId : "";
      const response = await updateUserProfile(data);
      console.log("Profile Updated:", response);
      setModalOpen(false);
    } catch (error) {
      console.error("Failed to update user profile:", error);
    }
  };

  const fieldDefinitions = {
    profileDetails: [
      { id: "givenName", label: "Name", type: "text" },
      { id: "surname", label: "Last Name", type: "text" },
      { id: "displayName", label: "Display Name", type: "text" },
      { id: "mobilePhone", label: "Contact Number", type: "text" },
    ],
  };

  return (
    <>
      <IconButton
        sx={{
          width: "30px",
          height: "30px",
        }}
        onClick={() => setModalOpen(true)}
        color="primary"
      >
        <ManageAccountsIcon fontSize="small" />
      </IconButton>

      <StyledDialog
        onClose={() => setModalOpen(false)}
        open={modalOpen}
        aria-labelledby="update-profile-dialog"
      >
        <DialogTitle id="update-profile-dialog">Update Profile</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setModalOpen(false)}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogContent dividers>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <FormSection
                fields={fieldDefinitions.profileDetails}
                control={control}
                errors={errors}
                columns={1}
                title=""
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
              Update
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>
    </>
  );
};
