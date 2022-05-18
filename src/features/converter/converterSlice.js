import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { client } from '../../api/client'

export const converterSlice = createSlice({
  name: 'converter',
  initialState: {
    symbols: [],
    symbolsStatus: "idle",
    convertedValue: null,
    convertedValueStatus: "idle"
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
  }
})

// Selectors
export const selectSymbols = state => state.converter.symbols
export const selectSymbolsStatus = state => state.converter.symbolsStatus

export const selectConvertedValue = state => state.converter.convertedValue
export const selectConvertedValueStatus = state => state.converter.convertedValueStatus

// Thunk
export const fetchSymbols = createAsyncThunk('converter/fetchSymbols', async () => {
  const response = await client.get('http://0.0.0.0:5000/symbols')
  return response.data.result
})

export const convertCurrency = createAsyncThunk('converter/convertCurrency', async ({amount, fromCurrency, toCurrency}) => {
  const response = await client.get(`http://0.0.0.0:5000/convert_currency?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
  return response.data.result
})

// Actions, reducer
export const { resetConvertedValue } = converterSlice.actions
export default converterSlice.reducer
