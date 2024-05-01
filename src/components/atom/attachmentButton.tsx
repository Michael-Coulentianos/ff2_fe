import React from "react";
import { Button } from "@mui/material";
import { AttachFile } from "@mui/icons-material";

interface AttachmentButtonProps {
  onClick: () => void; }

const AttachmentButton: React.FC<AttachmentButtonProps> = ({
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

export default AttachmentButton;
