import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";

import {
  fetchSymbols,
  selectSymbols,
  selectSymbolsStatus,
  selectLatestRates,
  selectLatestRatesStatus,
  fetchLatestRates
} from "./converterSlice";

import { DEFAULT_BASE_CURRENCY } from "../../constants";

export const ConverterTable = () => {
  const [baseCurrency, setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY)
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const dispatch = useDispatch()

  const symbols = useSelector(selectSymbols)
  const symbolsStatus = useSelector(selectSymbolsStatus)

  const latestRates = useSelector(selectLatestRates)
  const latestRatesStatus = useSelector(selectLatestRatesStatus)

  useEffect(() => {
    if (symbolsStatus === "idle") {
      dispatch(fetchSymbols())
    }

    if (latestRatesStatus === "idle") {
      dispatch(fetchLatestRates({baseCurrency}))
    }
  }, [symbolsStatus, latestRatesStatus])

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSelectBaseCurrency = event => {
    setBaseCurrency(event.target.value)
    dispatch(fetchLatestRates({baseCurrency: event.target.value}))
  }

  let rows = []
  if (latestRates) {
    for (const [key, value] of Object.entries(latestRates)) {
      rows.push(
        <TableRow
          key={key}
          sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
          <TableCell component="th" scope="row">
            {key}
          </TableCell>
          <TableCell align="right">{value}</TableCell>
        </TableRow>
      )
    }
  }

  const symbolMenuItems = symbols.map((symbol) => (
    <MenuItem value={symbol} key={symbol}>
      {symbol}
    </MenuItem>
  ))

  return (
    <React.Fragment>
      <Grid item xs={2}></Grid>
      <Grid container item xs={8} rowSpacing={2}>
        <Grid item xs={3}>
          <FormControl style={{ width: "100%" }}>
            <InputLabel>Base currency</InputLabel>
            <Select
              id="from-currency"
              value={baseCurrency}
              label="Base currency"
              style={{ textAlign: "left" }}
              onChange={handleSelectBaseCurrency}
            >
              {symbolMenuItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Currency</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(event, newPage) => setPage(newPage)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
