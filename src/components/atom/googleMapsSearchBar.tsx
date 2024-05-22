import React from "react";
import { Autocomplete, TextField } from "@mui/material";

interface SearchBarProps {
  handleInputChange: any;
  handleSuggestionSelected: any;
  suggestions: any;
  selectedSuggestion: any;
  inputValue: any;
}

const GoogleMapsSearchBar: React.FC<SearchBarProps> = ({
  handleInputChange,
  handleSuggestionSelected,
  suggestions,
  selectedSuggestion,
  inputValue,
}) => {
  return (
    <Autocomplete
      fullWidth
      value={selectedSuggestion}
      onChange={handleSuggestionSelected}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      options={suggestions}
      getOptionLabel={(option) => option.description}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search Map"
          variant="outlined"
          size="small"
          margin="dense"
        />
      )}
    />
  );
};

export default GoogleMapsSearchBar;
