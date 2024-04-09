import React from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onEdit, onDelete }) => (
  <>
    <IconButton onClick={onEdit}>
      <EditIcon />
    </IconButton>
    <IconButton onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  </>
);

export default ActionButtons;
