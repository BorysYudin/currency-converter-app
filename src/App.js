import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Header } from './components/Header'
import { Body } from './components/Body'

import { ConverterCalculator } from './features/converter/converterCalculator'
import { ConverterTable } from './features/converter/converterTable'

import { fetchSymbols, selectSymbolsStatus } from "./features/converter/converterSlice";

import './App.css'

function App() {
  const dispatch = useDispatch()
  const symbolsStatus = useSelector(selectSymbolsStatus)

  useEffect(() => {
    if (symbolsStatus === "idle") {
      dispatch(fetchSymbols())
    }
  }, [symbolsStatus])

  return (
    <div className="App">
        <Header />
        <Body>
          <ConverterCalculator />
          <ConverterTable />
        </Body>
    </div>
  );
}

export default App;
