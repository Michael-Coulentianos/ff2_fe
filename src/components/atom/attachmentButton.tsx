import React, { useState } from 'react';
import { Button, Typography, styled, FormHelperText } from '@mui/material';

const HiddenInput = styled('input')({
  display: 'none',
});

interface AddAttachmentButtonProps {
  id?: string;
  label: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
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
  const [file, setFile] = useState<File | null>(null);
  
  return (
    <div>
      <HiddenInput
        accept=".pdf,.doc,.docx"
        id={id}
        multiple
        type="file"
        onChange={onChange} 
        onBlur={onBlur}
      />
      <label htmlFor={id}>
        <Button variant="contained" color="primary" component="span">
          {label}
        </Button>
      </label>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </div>
  );
};

export default AddAttachmentButton;
