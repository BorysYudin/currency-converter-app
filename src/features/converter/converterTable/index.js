import React, { useEffect, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import Paper from '@mui/material/Paper';
import Grid from "@mui/material/Grid";

import MenuItem from "@mui/material/MenuItem";

import {
  selectSymbols,
  selectLatestRates,
  selectLatestRatesStatus,
  fetchLatestRates
} from "../converterSlice";
import { CurrencySelect } from '../currencySelect'
import CurrencyTable from './currencyTable'

import { DEFAULT_BASE_CURRENCY } from "../../../constants";

export const ConverterTable = () => {
  const [baseCurrency, setBaseCurrency] = useState(DEFAULT_BASE_CURRENCY)

  const dispatch = useDispatch()

  const symbols = useSelector(selectSymbols)

  const latestRates = useSelector(selectLatestRates)
  const latestRatesStatus = useSelector(selectLatestRatesStatus)

  useEffect(() => {
    if (latestRatesStatus === "idle") {
      dispatch(fetchLatestRates({baseCurrency}))
    }
  }, [latestRatesStatus])

  const handleSelectBaseCurrency = event => {
    setBaseCurrency(event.target.value)
    dispatch(fetchLatestRates({baseCurrency: event.target.value}))
  }

  return (
    <React.Fragment>
      <Grid item xs={2}></Grid>
      <Grid container item xs={8} rowSpacing={2}>
        <Grid item xs={3}>
          <CurrencySelect
            id="base-currency"
            value={baseCurrency}
            label="Base currency"
            onChange={handleSelectBaseCurrency}
            symbols={symbols}
          />
        </Grid>
        <Grid item xs={12}>
          <CurrencyTable latestRates={latestRates} />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
