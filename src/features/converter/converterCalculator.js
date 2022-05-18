import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";

import {
  selectSymbols,
  fetchSymbols,
  selectConvertedValue,
  selectSymbolsStatus,
  selectConvertedValueStatus,
  convertCurrency,
  resetConvertedValue,
} from "./converterSlice";

import {
  DEFAULT_AMOUNT,
  DEFAULT_FROM_CURRENCY,
  DEFAULT_TO_CURRENCY,
} from "../../constants";


export const ConverterCalculator = () => {
  const [amount, setAmount] = useState(DEFAULT_AMOUNT)
  const [fromCurrency, setFromCurrency] = useState(DEFAULT_FROM_CURRENCY)
  const [toCurrency, setToCurrency] = useState(DEFAULT_TO_CURRENCY)

  const dispatch = useDispatch()
  const symbols = useSelector(selectSymbols)
  const convertedValue = useSelector(selectConvertedValue)

  const symbolsStatus = useSelector(selectSymbolsStatus)
  const convertedStatus = useSelector(selectConvertedValueStatus)

  useEffect(() => {
    if (symbolsStatus === "idle") {
      dispatch(fetchSymbols())
    }
  }, [symbolsStatus])

  const symbolMenuItems = symbols.map((symbol) => (
    <MenuItem value={symbol} key={symbol}>
      {symbol}
    </MenuItem>
  ))

  const handleConvertClick = () => {
    if (convertedStatus === "idle") {
      dispatch(convertCurrency({ amount, fromCurrency, toCurrency }))
    }
  };

  const handleSwitchClick = () => {
    let fromCurrencyOld = fromCurrency
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrencyOld)
    dispatch(resetConvertedValue())
  };

  return (
    <Grid item xs={12}>
      <Paper style={{ padding: "36px 24px", maxWidth: 900, margin: "24px auto"}} noValidate autoComplete="off">
        <Grid container spacing={2}>
          <Grid item sm={3}>
            <TextField
              id="amount"
              label="Amount"
              variant="outlined"
              type="number"
              value={amount}
              style={{ width: "100%" }}
              onInput={(event) => {setAmount(event.target.value); dispatch(resetConvertedValue())}}
            />
          </Grid>
          <Grid item sm={4}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>From</InputLabel>
              <Select
                id="from-currency"
                value={fromCurrency}
                label="From"
                style={{ textAlign: "left" }}
                onChange={(event) => {setFromCurrency(event.target.value); dispatch(resetConvertedValue())}}
              >
                {symbolMenuItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={1}>
            <IconButton
              variant="outlined"
              onClick={handleSwitchClick}
              size="large"
            >
              <ChangeCircleOutlinedIcon />
            </IconButton>
          </Grid>
          <Grid item sm={4}>
            <FormControl style={{ width: "100%" }}>
              <InputLabel>To</InputLabel>
              <Select
                id="to-currency"
                value={toCurrency}
                label="To"
                style={{ textAlign: "left" }}
                onChange={(event) => {setToCurrency(event.target.value); dispatch(resetConvertedValue())}}
              >
                {symbolMenuItems}
              </Select>
            </FormControl>
          </Grid>
          <Grid item sm={8} style={{ textAlign: "left" }}>
            {convertedValue && (
              <span>
                {amount} {fromCurrency} = {convertedValue} {toCurrency}
              </span>
            )}
          </Grid>
          <Grid item sm={4} style={{textAlign: "right"}}>
            <Button variant="contained" onClick={handleConvertClick}>
              Convert
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};
