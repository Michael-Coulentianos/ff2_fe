import React from "react";
import { Chip } from "@mui/material";

interface DynamicChipProps {
  label: string;
}

const DynamicChip: React.FC<DynamicChipProps> = ({ label }) => {
  // Define the background color mappings based on chip text
  const backgroundColors: { [key: string]: string } = {
    General: "#3C4F1E",
    "Crop Analysis": "#F1A81E",
    Infection: "#DC3545",
    Damage: "#C96421",
  };

  // Determine the background color based on the chip text
  const backgroundColor = backgroundColors[label] || "#3C4F1E"; // Default to black if text does not match any mapping

  return (
    <Chip
      label={label}
      style={{ backgroundColor, color: "#ffffff", width: "110px" }}
    />
  );
};

export default DynamicChip;
