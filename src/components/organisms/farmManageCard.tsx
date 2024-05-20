import React, { useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Button,
  Paper,
  Divider,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Delete as DeleteIcon,
  Add as AddIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { useGlobalState } from '../../GlobalState';
import { useFetchData } from '../../hooks/useFethData';
import { getOrganizationFarms } from "../../api-ffm-service";
import { getUnlinkedFields } from "../../api-gs-service";
import { Farm } from '../../models/farm.interface';
import GenericConfirmDialog from "../organisms/genericConfirmDialog";
import { useNavigate } from 'react-router-dom';

export default function FarmFieldManagement() {

  const [farms, setFarms] = useState<Farm[]>([]);
  const [unlinkedFields, setUnlinkedFields] = useState<any[]>([]);
  const [expandedFarms, setExpandedFarms] = useState<{ [key: number]: boolean }>({});
  const [expandedUnlinkedFields, setExpandedUnlinkedFields] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const { selectedOrganization, activeAccount } = useGlobalState();

  const navigate = useNavigate();

  useFetchData(getOrganizationFarms, setFarms);
  console.log(activeAccount);

  useFetchData(getUnlinkedFields, setUnlinkedFields, undefined, [selectedOrganization?.partyIdentifier ?? '']);
  console.log(unlinkedFields);

  const toggleFarm = (farmId: number) => {
    setExpandedFarms((prevState) => ({
      ...prevState,
      [farmId]: !prevState[farmId],
    }));
  };

  const handleNavigation = (id, page) => {
    navigate(page, { state: { id } });
  };

  const toggleUnlinkedFields = () => {
    setExpandedUnlinkedFields((prevState) => !prevState);
  };

  const openDeleteConfirm = (farmId, event) => {
    event.stopPropagation();
    setSelectedFarmId(farmId);
    setConfirmOpen(true);
  };

  const handleConfirm = () => {
    if (selectedFarmId !== null) {
      console.log(`Delete Farm ${selectedFarmId}`);
      // Implement your farm deletion logic here
      setFarms((prevFarms) => prevFarms.filter(farm => farm.farmId !== selectedFarmId));
      setConfirmOpen(false);
      setSelectedFarmId(null);
    }
  };

  const handleFieldEdit = (fieldId) => {
    console.log(`Edit field ${fieldId}`);
    // Implement your edit logic here
  };

  const addFarm = () => {
    console.log("Add a new farm");
    // Implement your add farm logic here
  };

  return (
    <Paper elevation={3} className="overlay" sx={{ padding: 1, maxWidth: "230px" }}>
      <List subheader={"Manage Farms"}>
        {/* Add Farm button */}
        <Button
          variant="contained"
          fullWidth
          startIcon={<AddIcon />}
          onClick={addFarm}
          sx={{ marginTop: 1 }}
        >
          Add Farm
        </Button>
        {selectedOrganization && Array.isArray(farms) &&
          farms.map((farm) => (
            <div key={farm.farmId}>
              <ListItemButton onClick={() => toggleFarm(farm.farmId)}>
                <ListItemText primary={farm.farm} />
                {expandedFarms[farm.farmId] ? <ExpandLess /> : <ExpandMore />}
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(event) => openDeleteConfirm(farm.farmId, event)}
                  color="primary"
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
              <Collapse in={expandedFarms[farm.farmId]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => handleNavigation(undefined, "/fields")}
                    fullWidth
                  >
                    Add Field
                  </Button>
                  <Divider />
                </List>
              </Collapse>
            </div>
          ))}
        {unlinkedFields.length > 0 && (
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
                      onClick={() => handleNavigation(field.cropperRef, "/fields")}
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
    </Paper>
  );
}
