import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


export default function CurrencyTableRow({currency, value}) {
  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">{currency}</TableCell>
      <TableCell align="right">{value}</TableCell>
    </TableRow>
  )
}
