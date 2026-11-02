
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import type { RefObject } from 'react';
interface TypePropsChecked{
    label:string,
    ref?:RefObject<HTMLInputElement>
}
export default function Checked({label,ref}:TypePropsChecked) {
  return (
<FormControlLabel control={<Checkbox slotProps={{input:{ref}}} />} label={label} />
  )
}
