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
  selectConvertedValue,
  selectConvertedValueStatus,
  convertCurrency,
  resetConvertedValue,
} from "./converterSlice";
import { CurrencySelect } from './currencySelect'

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

  const convertedStatus = useSelector(selectConvertedValueStatus)

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
  <React.Fragment>
      <Grid item xs={1}></Grid>
      <Grid item xs={10}>
        <Paper style={{ padding: "36px 24px", margin: "24px 0"}} noValidate autoComplete="off">
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
              <CurrencySelect
                id="from-currency"
                value={fromCurrency}
                label="From"
                onChange={(event) => {setFromCurrency(event.target.value); dispatch(resetConvertedValue())}}
                symbols={symbols}
              />
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
              <CurrencySelect
                id="to-currency"
                value={toCurrency}
                label="To"
                onChange={(event) => {setToCurrency(event.target.value); dispatch(resetConvertedValue())}}
                symbols={symbols}
              />
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
    </React.Fragment>
  );
};
