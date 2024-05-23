import React from "react";
import { Chip } from "@mui/material";

interface DynamicChipProps {
  name: string;
  types: any[];
}

interface Property {
  key: string;
  value: string;
}

const DynamicChip: React.FC<DynamicChipProps> = ({ name, types }) => {
  const getColorFromProperties = (properties: Property[]): string => {
    const colorProp = properties.find(prop => prop.key.toLowerCase() === "color");
    return colorProp ? colorProp.value : "#3C4F1E";
  };

  const type = types.find(t => t.name === name);
  const backgroundColor = type ? getColorFromProperties(JSON.parse(type.properties as unknown as string)) : "#3C4F1E";

  return (
    <Chip
      label={name}
      style={{ backgroundColor, color: "#ffffff", width: "110px" }}
    />
  );
};

export default DynamicChip;
