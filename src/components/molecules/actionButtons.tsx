import React from "react";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import OrganizationDialog from "../organisms/organisationDialog";

interface ActionButtonsProps {
  onEdit: () => void;
  onDelete: () => void;
  onSubmit: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  onEdit,
  onDelete,
  onSubmit,
}) => (
  <>
    <OrganizationDialog
      isEdit={true}
      onEdit={onEdit}
      onSubmit={onSubmit}
    ></OrganizationDialog>
    <IconButton onClick={onDelete}>
      <DeleteIcon />
    </IconButton>
  </>
);

export default ActionButtons;
