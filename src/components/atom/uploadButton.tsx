import React from 'react';
import { Button, CircularProgress } from '@mui/material';
import { CloudUpload as CloudUploadIcon } from '@mui/icons-material';

interface UploadButtonProps {
  text: string;
  icon?: React.ReactElement;
  disabled?: boolean;
  loading?: boolean;
  error?: boolean;
  onClick: () => void;
}

const UploadButton: React.FC<UploadButtonProps> = ({
  text,
  icon = <CloudUploadIcon />,
  disabled = false,
  loading = false,
  error = false,
  onClick,
}) => (
  <Button
    startIcon={loading ? <CircularProgress size={24} /> : icon}
    onClick={onClick}
    disabled={disabled || loading}
    variant="contained"
    color={error ? "error" : "primary"}
    fullWidth
  >
    {text}
  </Button>
);

export default UploadButton;
