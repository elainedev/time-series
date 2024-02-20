import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  Paper,
} from "@material-ui/core";
import { TimeSeriesDataType } from "../types/types";

const DataTable: React.FC<TimeSeriesDataType> = ({ data }) => {
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const pageCount = Math.ceil(data.length / rowsPerPage);
  const [page, setPage] = useState(0);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const currentPageData = data.slice(
    page * rowsPerPage,
    (page + 1) * rowsPerPage
  );

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentPageData.map((row) => (
              <TableRow key={row.x}>
                <TableCell>{row.x}</TableCell>
                <TableCell>{row.y}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <Typography variant="body2">
        Page {page + 1} of {pageCount}
      </Typography>
    </>
  );
};

export default DataTable;
