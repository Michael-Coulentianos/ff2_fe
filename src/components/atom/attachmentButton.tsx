import React, { useState } from 'react';
import { Button, Typography, styled, FormHelperText } from '@mui/material';

const HiddenInput = styled('input')({
  display: 'none',
});

interface AddAttachmentButtonProps {
  id?: string;
  label: string;
  onChange: (file: File | null) => void;
  onBlur: () => void;
  error?: boolean;
  helperText?: string;
}

const AddAttachmentButton: React.FC<AddAttachmentButtonProps> = ({
  id,
  label,
  onChange,
  onBlur,
  error,
  helperText,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
    onChange(file);  
  };
  
  return (
    <div>
      <HiddenInput
        accept=".pdf,.doc,.docx"
        id={id}
        multiple
        type="file"
        onChange={handleFileChange} 
        onBlur={onBlur}
      />
      <label htmlFor={id}>
        <Button variant="contained" color="primary" component="span" sx={{marginTop:"5px"}}>
          {label}
        </Button>
      </label>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
      {selectedFile && (
        <Typography variant="caption" display="block" gutterBottom>
          Selected File: {selectedFile.name}
        </Typography>
      )}
    </div>
  );
};

export default AddAttachmentButton;
