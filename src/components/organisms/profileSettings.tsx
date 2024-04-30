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
import { useMsal } from "@azure/msal-react";
import { UserProfile } from "../../models/userProfile.interface";
import { updateUserProfile } from "../../apiService";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import TextBox from "../atom/textBox";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

export const validationSchema = yup.object().shape({
  givenName: yup.string().required("This field is required"),
  mobilePhone: yup.string().required("This field is required").min(10),
});

const MuiDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export const UserProfileForm: React.FC = () => {
  const { instance } = useMsal();
  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  console.log(activeAccount);
  const [userProfile, setUserProfile] = useState<UserProfile>({
    givenName: activeAccount ? activeAccount.idTokenClaims?.given_name: "",
    mobilePhone: activeAccount ? activeAccount.idTokenClaims?.extension_Cellphone : "",
    surname: "",
    displayName: "",
    azureUserId: activeAccount.localAccountId
  });

  useEffect(() => {
    if (activeAccount) {
      setUserProfile((prevProfile) => ({
        ...prevProfile,
        AzureUserId: activeAccount.localAccountId,
      }));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserProfile({
      ...userProfile,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await updateUserProfile(userProfile);
      console.log(response.data);
    } catch (error: any) {
      throw new Error(error.response.data);
    }
  };

  const [modalOpen, setModalOpen] = useState(false);
  const {
    control,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <>
      <IconButton onClick={() => setModalOpen(true)} color="primary">
        <ManageAccountsIcon />
      </IconButton>

      <MuiDialog
        onClose={() => setModalOpen(false)}
        aria-labelledby="customized-dialog-title"
        open={modalOpen}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          <Grid container direction="row">
            <Grid item xs={12}>
              Update Profile
            </Grid>
          </Grid>
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setModalOpen(false)}
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
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <Controller
                  name="givenName"
                  control={control}
                  defaultValue={userProfile.givenName}
                  render={({ field }) => (
                    <TextBox
                      {...field}
                      onChange={handleChange}
                      label="Given Name"
                      error={!!errors?.givenName}
                      helperText={errors?.givenName?.message}
                    />
                  )}
                />

                <Controller
                  name="mobilePhone"
                  control={control}
                  defaultValue={userProfile.mobilePhone}
                  render={({ field }) => (
                    <TextBox
                      {...field}
                      onChange={handleChange}
                      label="Mobile Phone"
                      error={!!errors?.mobilePhone}
                      helperText={errors?.mobilePhone?.message}
                    />
                  )}
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
              Update
            </Button>
          </DialogActions>
        </form>
      </MuiDialog>
    </>
  );
};
