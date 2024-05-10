import React from "react";
import { Chip } from "@mui/material";
import { NoteType } from "../../models/NoteType.interface";

interface DynamicChipProps {
  name: string;
  noteTypes: NoteType[];
}

interface Property {
  key: string;
  value: string;
}

const DynamicChip: React.FC<DynamicChipProps> = ({ name, noteTypes }) => {

  const getColorFromProperties = (properties: Property[]): string => {
    const colorProp = properties.find(prop => prop.key === "color");
    return colorProp ? colorProp.value : "#3C4F1E";
  };

  const noteType = noteTypes.find(nt => nt.name === name);
  const backgroundColor = noteType ? getColorFromProperties(JSON.parse(noteType.properties as unknown as string)) : "#3C4F1E";

  return (
    <Chip
      label={name}
      style={{ backgroundColor, color: "#ffffff", width: "110px" }}
    />
  );
};

export default DynamicChip;
