import React, { useEffect, useState } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  IconButton,
  Button,
  MenuItem,
  Paper,
  Container,
  Divider,
} from "@mui/material";
import {
  ExpandLess,
  ExpandMore,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import TextBox from "../atom/textBox";
import { getOrganizations } from "../../api-ffm-service";
import { useFetchData } from "../../hooks/useFethData";

export default function FarmFieldManagement() {
  const [openFarms, setOpenFarms] = useState({});
  const [selectedOrganization, setSelectedOrganization] = useState("");
  const [organizations, setOrganizations] = useState<any[]>([]);

  useFetchData(getOrganizations, setOrganizations);

  const toggleFarm = (farmId) => {
    setOpenFarms((prevState) => ({
      ...prevState,
      [farmId]: !prevState[farmId],
    }));
  };

  const deleteFarm = (farmId) => {
    console.log(`Delete Farm ${farmId}`);
    // Implement your farm deletion logic here
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

  const addField = (farmId) => {
    console.log(`Add a new field in Farm ${farmId}`);
    // Implement your add field logic here
  };

  return (
    <Paper
      elevation={3}
      className="overlay"
      sx={{ padding: 1, maxWidth: "300px" }}
    >
      <List subheader={"Manage Farms"}>
        {/* Organization dropdown */}
        <TextBox
          label={"Organisation"}
          select
          value={selectedOrganization}
          onChange={(e) => setSelectedOrganization(e.target.value)}
        >
          {organizations?.map((org) => (
            <MenuItem key={org.partyId} value={org.partyId}>
              {org.name}
            </MenuItem>
          ))}
        </TextBox>
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
        {/* CHANGE THE BELOW TO ONLY DISPLAY THE SELECTED ORGANISATION's FARMS & FIELDS */}
        {selectedOrganization &&
          organizations?.map((f) =>
            f.farms.map((farm) => (
              <div key={farm.id}>
                <ListItemButton onClick={() => toggleFarm(farm.id)}>
                  <ListItemText primary={farm.name} />
                  {openFarms[farm.id] ? <ExpandLess /> : <ExpandMore />}
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteFarm(farm.id)}
                    color="primary"
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemButton>
                <Collapse in={openFarms[farm.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <Button
                      variant="outlined"
                      size="small"
                      startIcon={<AddIcon />}
                      onClick={() => addField(farm.id)}
                      fullWidth
                    >
                      Add Field
                    </Button>
                    {farm.fields.map((field) => (
                      <ListItemButton key={field.id} sx={{ pl: 4 }}>
                        <ListItemText primary={field.name} />
                        <EditIcon
                          sx={{ margin: 1 }}
                          fontSize="small"
                          onClick={() => handleFieldEdit(farm.id, field.id)}
                          color="primary"
                        />
                        <DeleteIcon
                          sx={{ margin: 1 }}
                          fontSize="small"
                          onClick={() => handleFieldDelete(farm.id, field.id)}
                          color="primary"
                        />
                      </ListItemButton>
                    ))}
                    <Divider />
                  </List>
                </Collapse>
              </div>
            ))
          )}
      </List>
    </Paper>
  );
}
