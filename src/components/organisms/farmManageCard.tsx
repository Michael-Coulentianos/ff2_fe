import React, { useState, useEffect } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Button,
  Paper,
  Divider,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Grid,
  TextField,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Delete as DeleteIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { useGlobalState } from "../../GlobalState";
import { fetchData, useFetchData } from "../../hooks/useFethData";
import { getOrganizationFarms, deleteFarm, updateFarm, createFarm } from "../../api-ffm-service";
import { getUnlinkedFields, getLinkedFields } from "../../api-gs-service";
import { Farm } from "../../models/farm.interface";
import GenericConfirmDialog from "../organisms/genericConfirmDialog";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { styled } from "@mui/material/styles";

const validationSchema = yup.object({
  farmName: yup.string().required("Farm name is required"),
});

const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function FarmFieldManagement() {
  const [farms, setFarms] = useState<Farm[]>([]);
  const [unlinkedFields, setUnlinkedFields] = useState<any[]>([]);
  const [linkedFields, setLinkedFields] = useState<{ [key: number]: any[] }>({});
  const [expandedFarms, setExpandedFarms] = useState<{ [key: number]: boolean }>({});
  const [expandedUnlinkedFields, setExpandedUnlinkedFields] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentFarm, setCurrentFarm] = useState<Farm | null>(null);
  const { selectedOrganization, activeAccount } = useGlobalState();

  const navigate = useNavigate();

  useFetchData(getOrganizationFarms, setFarms, undefined, [selectedOrganization?.organizationId ?? 0]);
  useFetchData(getUnlinkedFields, setUnlinkedFields, undefined, [selectedOrganization?.partyIdentifier  ?? '']);

  const toggleFarm = (farmId: number, farmIdentifier: string) => {
    setExpandedFarms((prevState) => ({
      ...prevState,
      [farmId]: !prevState[farmId],
    }));

    if (!expandedFarms[farmId]) {
      fetchData(getLinkedFields, (data) => {
        setLinkedFields((prevState) => ({
          ...prevState,
          [farmId]: data,
        }));
      }, undefined, [farmIdentifier]);
    }
  };

  const handleNavigation = (fieldData, page) => {
    navigate(page, { state: { fieldData } });
  };

  const toggleUnlinkedFields = () => {
    setExpandedUnlinkedFields((prevState) => !prevState);
  };

  const openDeleteConfirm = (farmId, event) => {
    event.stopPropagation();
    setSelectedFarmId(farmId);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (selectedFarmId) {
      try {
        await deleteFarm(selectedFarmId);
        setFarms(
          farms.filter((farm) => farm.farmId !== selectedFarmId)
        );
      } catch (error) {
        console.error("Failed to delete organization:", error);
      }
    }

    setConfirmOpen(false);
  };

  const handleFieldEdit = (farm) => {
    setCurrentFarm(farm);
    setDialogOpen(true);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (currentFarm) {
      reset({ farmName: currentFarm.farm });
    } else {
      reset({ farmName: "" });
    }
  }, [currentFarm, reset]);

  const onSubmit = async (formData: any) => {
    try {
      if (currentFarm) {
        const updateData = {
          farmId: currentFarm.farmId,
          name: formData.farmName,
          partyId: selectedOrganization?.partyId,
        };
        await updateFarm(updateData);
      } else {
        const createData = {
          name: formData.farmName,
          partyId: selectedOrganization?.partyId,
        };
        await createFarm(createData);
      }
    } catch (error) {
      console.error("Error submitting farm:", error);
    }

    fetchData(getOrganizationFarms, setFarms, undefined, [selectedOrganization?.organizationId ?? 0]);
    handleCloseForm();
  };

  const handleCloseForm = () => {
    setDialogOpen(false);
    setCurrentFarm(null);
  };

  return (
    <Paper
      elevation={3}
      className="overlay"
      sx={{ padding: 1, maxWidth: "250px" }}
    >
      <List subheader={"Manage Farms"}>
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
          onClick={() => {
            setCurrentFarm(null);
            setDialogOpen(true);
          }}
          sx={{ marginTop: 1 }}
        >
          Add Farm
        </Button>
        {selectedOrganization &&
          Array.isArray(farms) &&
          farms.map((farm) => (
            <div key={farm.farmId}>
              <ListItemButton onClick={() => toggleFarm(farm.farmId, farm.farmIdentifier)}>
                <ListItemText primary={farm.farm} />
                {expandedFarms[farm.farmId] ? <ExpandLess /> : <ExpandMore />}
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleFieldEdit(farm);
                  }}
                  color="primary"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(event) => openDeleteConfirm(farm.farmId, event)}
                  color="primary"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
              <Collapse
                in={expandedFarms[farm.farmId]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {linkedFields[farm.farmId]?.map((field, index) => (
                    <ListItemButton key={index}>
                      <ListItemText primary={field.fieldName} />
                      <IconButton
                        edge="end"
                        aria-label="view"
                        onClick={() => handleNavigation(field, "/fields")}
                        color="primary"
                      >
                        <ViewIcon />
                      </IconButton>
                    </ListItemButton>
                  ))}
                  <Divider />
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => handleNavigation(undefined, "/fields")}
                    fullWidth
                  >
                    Add Field
                  </Button>
                </List>
              </Collapse>
            </div>
          ))}
        {unlinkedFields?.length > 0 && (
          <div>
            <ListItemButton onClick={toggleUnlinkedFields}>
              <ListItemText primary="Unlinked Fields" />
              {expandedUnlinkedFields ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={expandedUnlinkedFields} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {unlinkedFields.map((field, index) => (
                  <ListItemButton key={index}>
                    <ListItemText primary={field.fieldName} />
                    <IconButton
                      edge="end"
                      aria-label="view"
                      onClick={() => handleNavigation(field, "/fields")}
                      color="primary"
                    >
                      <ViewIcon />
                    </IconButton>
                  </ListItemButton>
                ))}
                <Divider />
              </List>
            </Collapse>
          </div>
        )}
      </List>
      <GenericConfirmDialog
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirm}
        title="Confirm Deletion"
        content="Are you sure you want to delete this farm?"
      />

      {/* Add/Edit Farm Dialog */}
      <StyledDialog
        onClose={() => setDialogOpen(false)}
        open={dialogOpen}
        aria-labelledby="add-edit-farm-dialog"
      >
        <DialogTitle id="add-edit-farm-dialog">
          {currentFarm ? "Edit Farm" : "Add New Farm"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={() => setDialogOpen(false)}
          sx={{
            position: "absolute",
            right: 10,
            top: 10,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <Grid item xs={12}>
                <Controller
                  name="farmName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Farm Name"
                      variant="outlined"
                      fullWidth
                      error={!!errors.farmName}
                      helperText={errors.farmName ? errors.farmName.message : ""}
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
              Save
            </Button>
          </DialogActions>
        </form>
      </StyledDialog>
    </Paper>
  );
}
