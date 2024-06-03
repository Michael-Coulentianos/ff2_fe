import React from "react";
import {
  TextField,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";

const NoteForm: React.FC = () => {
  return (
    <form noValidate autoComplete="off">
      <h1>Notes</h1>
      <TextField label="Title" variant="outlined" fullWidth margin="normal" />
      <TextField label="Type" variant="outlined" fullWidth margin="normal" />
      <TextField
        label="Date"
        variant="outlined"
        fullWidth
        margin="normal"
        type="date"
        InputLabelProps={{ shrink: true }}
      />
      <TextField
        label="Description"
        variant="outlined"
        fullWidth
        margin="normal"
        multiline
        rows={4}
      />
      <FormControl component="fieldset" margin="normal">
        <FormLabel component="legend">Radio Group</FormLabel>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          {[
            "Option 1",
            "Option 2",
            "Option 3",
            "Option 4",
            "Option 5",
            "Option 6",
          ].map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio color="primary" />}
              label={option}
              labelPlacement="end"
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Button variant="contained" color="primary">
        Add Attachment
      </Button>
      <Button variant="contained" color="secondary">
        Cancel
      </Button>
      <Button variant="contained" color="primary">
        Add New
      </Button>
    </form>
  );
};

export default NoteForm;
