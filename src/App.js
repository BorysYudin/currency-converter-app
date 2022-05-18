import { Header } from './components/Header'
import { Body } from './components/Body'

import { ConverterCalculator } from './features/converter/converterCalculator'
import { ConverterTable } from './features/converter/converterTable'

import './App.css'

function App() {
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
