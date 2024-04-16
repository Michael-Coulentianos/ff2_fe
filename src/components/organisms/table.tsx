import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Container,
  Paper,
} from "@mui/material";

interface TableData {
  id: string;
  [key: string]: string;
}
interface Organization {
  name: string;
  contactInfo: string;
  address: string;
}

interface ColumnConfig {
  label: string;
  dataKey: keyof TableData;
  renderCell: (item: TableData) => React.ReactNode;
}

interface DynamicTableProps {
  data: TableData[];
  columns: ColumnConfig[];
}

const DynamicTable: React.FC<DynamicTableProps> = ({ data, columns }) => {
  return (
    <Container>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns &&
                columns.map((column) => (
                  <TableCell key={column.label}>{column.label}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column.label}>
                      {column.renderCell(item)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default DynamicTable;
