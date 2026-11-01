import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import type React from 'react';
interface TypeListSelectAutoCompliate{
  data?:Array<string> ;
  label?:string,
  disable?:boolean,
  selectData?:string,
  setSelectData?: (event: React.SyntheticEvent, value: string | null) => void
}

export default function AutoCompliate({data,label,disable,selectData='',setSelectData}:TypeListSelectAutoCompliate) {
  return (
   <Autocomplete
   fullWidth={true}
   disabled={disable}
  disablePortal
  value={selectData}
  onChange={setSelectData}
  options={data || []}
  size='small'
  renderInput={(params) => <TextField {...params} label={label} />}
/>
  )
}
