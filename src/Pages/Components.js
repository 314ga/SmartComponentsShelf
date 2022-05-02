import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  component,
  threshold,
  orderTime,
  autOrd,
  status,
  ordStatus
) {
  return { component, threshold, orderTime, autOrd, status, ordStatus };
}

const rows = [
  createData("Pens", 50, 3, -1, "GOOD", "Last order: 20.04.2022"),
  createData(
    "Screwdrivers",
    10,
    5,
    5,
    "ORDER RECOMENDED",
    "Last order: 29.04.2022"
  ),
  createData(
    "Capacitors",
    15,
    10,
    4,
    "ORDERED",
    "Expected delivery: 03.05.2022"
  ),
];

const Components = () => {
  return (
    <TableContainer
      component={Paper}
      style={{ marginLeft: "400px", marginRight: "100px" }}
    >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Component</StyledTableCell>
            <StyledTableCell align="right">Threshold (pieces)</StyledTableCell>
            <StyledTableCell align="right">OrderTime (days)</StyledTableCell>
            <StyledTableCell align="right">
              Automatic ordering (When x pieces left)
            </StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
            <StyledTableCell align="right">Order Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.component}>
              <StyledTableCell component="th" scope="row">
                {row.component}
              </StyledTableCell>
              <StyledTableCell align="right">{row.threshold}</StyledTableCell>
              <StyledTableCell align="right">{row.orderTime}</StyledTableCell>
              <StyledTableCell align="right">
                {row.autOrd > -1 ? row.autOrd : "OFF"}
              </StyledTableCell>

              <StyledTableCell align="right">{row.status}</StyledTableCell>
              <StyledTableCell align="right">{row.ordStatus}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Components;
