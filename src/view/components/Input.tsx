import TextField from '@mui/material/TextField';
import type React from 'react';
interface TypePropsInput{
    typeInput?:string,
    label?:string,
    ref?:React.RefObject<HTMLInputElement>,
    setStateValue?:(ev:React.ChangeEvent<HTMLInputElement>)=>void,
    value?:string
}

export default function Input({typeInput,label,ref,setStateValue,value}:TypePropsInput) {
  return (
<TextField inputRef={ref}  label={label} variant="outlined" size="small" onChange={setStateValue} defaultValue={value} type={typeInput}   fullWidth/>
  )
}
