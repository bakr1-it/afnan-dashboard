import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useLanguageContext } from '../../context/LanguageContext';


interface TypeProps{

  refChecked?:React.RefObject<HTMLInputElement>
}
export default function MailFmail({refChecked}:TypeProps) {
  const id = React.useId();
  const { t } = useLanguageContext();
  return (
    <FormControl fullWidth >
      <FormLabel id={`${id}-label`}>{t("gender")}</FormLabel>
      <RadioGroup defaultValue="male" row aria-labelledby={`${id}-label`} name="row-radio-buttons-group">
        <FormControlLabel value="female" control={<Radio />} label={t("female")} />
        <FormControlLabel value="male" control={<Radio slotProps={{ input: { ref: refChecked } }} />} label={t("male")} />
      </RadioGroup>
    </FormControl>
  );
}
