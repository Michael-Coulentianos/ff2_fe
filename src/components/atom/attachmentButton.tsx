import React from "react";
import { Button } from "@mui/material";
import { AttachFile } from "@mui/icons-material";

interface AddAttachmentButtonProps {
  onClick: () => void; }

const AddAttachmentButton: React.FC<AddAttachmentButtonProps> = ({
  onClick,
}) => {
  return (
    <Button
      variant="contained"
      color="primary"
      startIcon={<AttachFile />}
      onClick={onClick}
    >
      Add File
    </Button>
  );
};

export default AddAttachmentButton;
