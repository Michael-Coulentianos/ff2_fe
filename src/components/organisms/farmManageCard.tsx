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
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useGlobalState } from '../../GlobalState';
import { useFetchData } from '../../hooks/useFethData';
import { getOrganizationFarms } from "../../api-ffm-service";
import { Farm } from '../../models/farm.interface';
import GenericConfirmDialog from "../organisms/genericConfirmDialog";

export default function FarmFieldManagement() {

  const [farms, setFarms] = useState<Farm[]>([]);
  const [expandedFarms, setExpandedFarms] = useState<{ [key: number]: boolean }>({});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedFarmId, setSelectedFarmId] = useState<number | null>(null);
  const { selectedOrganization } = useGlobalState();

  useFetchData(getOrganizationFarms, setFarms);

  const toggleFarm = (farmId: number) => {
    setExpandedFarms((prevState) => ({
      ...prevState,
      [farmId]: !prevState[farmId],
    }));
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

  const handleFieldEdit = (farmId, fieldId) => {
    console.log(`Edit field ${fieldId} in Farm ${farmId}`);
    // Implement your edit logic here
  };

  const handleFieldDelete = (farmId, fieldId) => {
    console.log(`Delete field ${fieldId} in Farm ${farmId}`);
    // Implement your delete logic here
  };

  const addFarm = () => {
    console.log("Add a new farm");
    // Implement your add farm logic here
  };

  const addField = (farmId: number) => {
    console.log(`Add a new field in Farm ${farmId}`);
    // Implement your add field logic here
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
                    onClick={() => addField(farm.farmId)}
                    fullWidth
                  >
                    Add Field
                  </Button>
                  <Divider />
                </List>
              </Collapse>
            </div>
          ))}
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
