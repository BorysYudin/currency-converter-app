import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const converterSlice = createSlice({
  name: 'converter',
  initialState: {
    symbols: [],
    symbolsStatus: "idle",
    convertedValue: null,
    convertedValueStatus: "idle",
    latestRates: null,
    latestRatesStatus: "idle"
  },
  reducers: {
    resetConvertedValue: (state, payload) => {
      state.convertedValue = null
      state.convertedValueStatus = "idle"
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchSymbols.pending, (state, action) => {
        state.symbolsStatus = 'loading'
      })
      .addCase(fetchSymbols.fulfilled, (state, action) => {
        state.symbolsStatus = 'succeeded'
        state.symbols = action.payload
      })
      .addCase(convertCurrency.pending, (state, action) => {
        state.convertedValueStatus = 'loading'
      })
      .addCase(convertCurrency.fulfilled, (state, action) => {
        state.convertedValueStatus = 'succeeded'
        state.convertedValue = action.payload
      })
      .addCase(fetchLatestRates.pending, (state, action) => {
        state.latestRatesStatus = 'loading'
      })
      .addCase(fetchLatestRates.fulfilled, (state, action) => {
        state.latestRatesStatus = 'succeeded'
        state.latestRates = action.payload
      })
  }
})

// Selectors
export const selectSymbols = state => state.converter.symbols
export const selectSymbolsStatus = state => state.converter.symbolsStatus

export const selectConvertedValue = state => state.converter.convertedValue
export const selectConvertedValueStatus = state => state.converter.convertedValueStatus

export const selectLatestRates = state => state.converter.latestRates
export const selectLatestRatesStatus = state => state.converter.latestRatesStatus

// Thunk
export const fetchSymbols = createAsyncThunk('converter/fetchSymbols', async () => {
  const response = await client.get(`${process.env.REACT_APP_API_HOST}/symbols`)
  return response.data.result
})

export const convertCurrency = createAsyncThunk('converter/convertCurrency', async ({amount, fromCurrency, toCurrency}) => {
  const response = await client.get(`${process.env.REACT_APP_API_HOST}/convert_currency?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
  return response.data.result
})

export const fetchLatestRates = createAsyncThunk('converter/fetchLatestRates', async ({baseCurrency}) => {
  const response = await client.get(`${process.env.REACT_APP_API_HOST}/latest_rates?base=${baseCurrency}`)
  return response.data.result
})

// Actions, reducer
export const { resetConvertedValue } = converterSlice.actions
export default converterSlice.reducer
