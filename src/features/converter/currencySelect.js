import { Fragment } from "react";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";

export const CurrencySelect = props => {
  const menuItems = props.symbols.map((symbol) => (
    <MenuItem value={symbol} key={symbol}>
      {symbol}
    </MenuItem>
  ))
  return (
    <FormControl style={{ width: "100%" }}>
      <InputLabel>{props.label}</InputLabel>
      <Select
        id={props.id}
        value={props.value}
        label={props.label}
        style={{ textAlign: "left" }}
        onChange={props.onChange}
      >
        {menuItems}
      </Select>
    </FormControl>
  )
}
