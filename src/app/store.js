import { configureStore } from '@reduxjs/toolkit'
import converterReducer from '../features/converter/converterSlice'

export default configureStore({
  reducer: {
    converter: converterReducer
  },
})
