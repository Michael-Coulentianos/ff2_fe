import React, { useState } from "react";
import { Typography, Button, Container, Grid, styled } from "@mui/material";

const HiddenInput = styled("input")({
  display: "none",
});

const AddAttachmentButton: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (file) {
      setFile(null);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <HiddenInput
        accept=".pdf,.doc,.docx"
        id="file-upload"
        multiple
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" color="primary" component="span">
          Choose File
        </Button>
      </label>
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ marginLeft: 2 }}
      >
        Upload
      </Button>
      {file && (
        <Typography variant="overline" gutterBottom sx={{ marginLeft: 1 }}>
          <b>Selected File:</b> {file.name}
        </Typography>
      )}
    </form>
  );
};

export default AddAttachmentButton;