import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { type SelectChangeEvent } from '@mui/material/Select';
interface TypeListSelect{
  data?:Array<string>;
  label?:string,
  dataObj?:Record<string,string>,
  dis?:boolean,
  selectData?:string,
setSelectData?: (event: SelectChangeEvent) => void;
}
export default function ListSelect({data,label,dataObj,dis,selectData='',setSelectData}:TypeListSelect) {
 
  const [open, setOpen] = React.useState(false);



  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
  
      <FormControl fullWidth size="small">
        <InputLabel id="demo-controlled-open-select-label">{label}</InputLabel>
        <Select
        disabled={dis}
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={selectData}
          label="Academic"
          onChange={setSelectData}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          
          {data && data.map((d)=><MenuItem value={d}>{d}</MenuItem>)}
      
          {dataObj && Object.entries(dataObj).map((c)=><MenuItem value={c[0]}>{c[1]}</MenuItem>)}

    
        </Select>
      </FormControl>

  );
}