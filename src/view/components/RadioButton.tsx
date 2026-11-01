import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
interface typePropsRadioButton{
  label:string,
  value:string,
}
export default function RadioButton({label,value}:typePropsRadioButton) {
      const id = React.useId();
  return (
    <FormControl fullWidth >
      <FormLabel id={`${id}-label`}>{label}</FormLabel>
      <RadioGroup row aria-labelledby={`${id}-label`} name="row-radio-buttons-group">
        <FormControlLabel value={value} control={<Radio />} label={label} />
      </RadioGroup>
    </FormControl>
  )
}
