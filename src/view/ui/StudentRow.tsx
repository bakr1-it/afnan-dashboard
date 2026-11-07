import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Grid from "@mui/material/Grid";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { listCountryWithIso } from "../constants/country";
import { converTimeToDate } from "../../helper";
import { Link } from "react-router-dom";
export interface UserData {
  id: string;
  name: string;
  email: string;
  role?: string | null;
  phone_number?: string | null;
  created_at?: string;
  country?: string | null;
  is_male?: boolean | null;
  language_code?: string | null;
  is_new_muslim?: boolean | null;
  birth_date?: string | null;
  city?: string | null;
  teacher_id?: string | null;
  last_reels_id?: number | string | null;
  teachers?: { id: string; name: string } | null;
  reels?: { id: string; title: string } | null;
}
function PrintDataUser({ label, value }: { label: string; value: any }) {
  let displayValue = value;
if(label == "student_level_progress")return;
if(label == "country") displayValue = listCountryWithIso[value];
  if (label === "created_at" || label === "birth_date") {
    displayValue = converTimeToDate(value);
  }  else if (label === "is_male") {
    displayValue = value === true ? "ذكر" : "أنثى" ;
  } else if (label === "is_new_muslim") {
    displayValue = value === true ? "نعم" : "لا";
  }



  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} className="user-info-item">
      <p className="font-semibold text-gray-700">{ label}</p>
      <p className="text-gray-600">{displayValue !== null && displayValue !== undefined && displayValue !== "" ? String(displayValue) : "—"}</p>
    </Grid>
  );
}
export default function StudentRow({row} :{row:UserData}) {

  
      const [open, setOpen] = React.useState(false);
  const detailsId = React.useId();

  return (
    <React.Fragment>
      <TableRow sx={{ "& > .MuiTableCell-root": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label={open ? "collapse row" : "expand row"}
            aria-expanded={open}
            aria-controls={detailsId}
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <MdKeyboardArrowUp size={22} /> : <MdKeyboardArrowDown size={22} />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="left">{row.phone_number || "—"}</TableCell>
        <TableCell align="left">{row.teachers?.name || "—"}</TableCell>
        <TableCell align="left"><Link  className="link" to={`/level/${row.id}`}>Level</Link></TableCell>
      </TableRow>
      <TableRow id={detailsId} aria-hidden={!open ? true : undefined}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container spacing={2} className="container-user-info">
              {Object.entries(row)
  .filter(([key]) => !["teachers", "reels", "password", "id", "teacher_id", "last_reels_id"].includes(key))
  .map(([keys, values]) => (
    <PrintDataUser key={keys} label={keys} value={values} />
  ))}
  


              </Grid>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


