import React, { useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Container, Paper, Pagination } from "@mui/material";

interface TableData {
  id: string;
  [key: string]: any;
}

interface ColumnConfig {
  label: string;
  dataKey: keyof TableData;
  renderCell: (item: TableData) => React.ReactNode;
}

interface DynamicTableProps {
  data: TableData[];
  columns: ColumnConfig[];
  rowsPerPage: number;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ data, columns, rowsPerPage }) => {
  const [page, setPage] = React.useState(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
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
            {Array.isArray(data) &&
              data
                .slice((page - 1) * rowsPerPage, page * rowsPerPage)
                .map((item) => (
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
      <Pagination
        sx={{ marginTop: 2 }}
        count={Math.ceil(data.length / rowsPerPage)}
        page={page}
        onChange={handleChange}
      />
    </Container>
  );
};

export default DynamicTable;
