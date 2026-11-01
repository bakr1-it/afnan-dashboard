import TextField from '@mui/material/TextField';
interface TypePropsInput{
    typeInput?:string,
    label?:string,
}

export default function Input({typeInput,label}:TypePropsInput) {
  return (
<TextField id="standard-basic" label={label} variant="outlined" size="small" type={typeInput} fullWidth/>
  )
}
