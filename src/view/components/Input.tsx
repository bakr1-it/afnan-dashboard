import TextField from '@mui/material/TextField';
import type React from 'react';
interface TypePropsInput{
    typeInput?:string,
    label?:string,
    ref?:React.RefObject<HTMLInputElement>,
}

export default function Input({typeInput,label,ref}:TypePropsInput) {
  return (
<TextField inputRef={ref} id="standard-basic" label={label} variant="outlined" size="small" type={typeInput} fullWidth/>
  )
}
