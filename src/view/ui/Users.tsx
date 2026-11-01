import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import { Link } from "react-router-dom";

import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ListSelect from "../components/ListSelect";
export interface UserData {
  id: string;
  name: string;
  email: string;
  phone_number?: string | null;
  created_at: string;
  country?: string | null;
  is_male?: boolean | null;
  language_code?: string | null;
  is_new_muslim?: boolean | null;
  birth_date?: string | null;
  city?: string | null;
  last_reels_id?: number | null;
}
interface TypeUser {
  academic:string,
  name:string,
  teacher:string,
  mentor:string,
  id:string,
  data:UserData

}
function PrintDataUser({label,value}:{label:string,value:string}){
  return (  
        <Grid size={{xs:12 , sm:6 , md:4 }} className="user-info-item">
          <p>{label}</p>
          <p>{value}</p>
         
        </Grid>)
}


function Row({ row }: { row: TypeUser }) {

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
        <TableCell align="left">{row.id}</TableCell>
        <TableCell align="left">{row.academic}</TableCell>
        <TableCell align="left">{row.mentor}</TableCell>
        <TableCell align="left">{row.teacher}</TableCell>
        <TableCell align="left">{row.name}</TableCell>
      </TableRow>
      <TableRow id={detailsId} aria-hidden={!open ? true : undefined}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          {/* print data for studnet */}
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Grid container spacing={2} className="container-user-info"> 
                {Object.entries(row.data).map(([keys,values],idx)=>
                  (
                    <PrintDataUser key={idx} label={keys} value={values} />
                  ))}

        

              </Grid>
       
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export const rows: TypeUser[] = [
  {
    id: "usr_rec_01",
    name: "أحمد بن عبد الله",
    academic: "جمعية الفرقان لتحفيظ القرآن",
    teacher: "الشيخ عبد الرحمن السقاف",
    mentor: "أ. محمد العمري",
    data: {
      id: "a1b2c3d4-e5f6-7890-abcd-111111111111",
      name: "أحمد بن عبد الله",
      email: "ahmed.abdullah@example.com",
      phone_number: "+967771234567",
      country: "اليمن",
      city: "صنعاء",
      is_male: true,
      language_code: "ar",
      created_at: "2026-01-15T08:30:00Z",
      is_new_muslim: false,
      birth_date: "2002-04-12T00:00:00Z",
      last_reels_id: 105,
    },
  },
  {
    id: "usr_rec_02",
    name: "مريم العولقي",
    academic: "جمعية التبيان النسوية",
    teacher: "أ. فاطمة باحشوان",
    mentor: "د. هدى الكاف",
    data: {
      id: "f8c3b1e2-5678-4d9e-8a7b-222222222222",
      created_at: "2026-02-01T11:15:00Z",
      name: "مريم العولقي",
      email: "mariam.awlaqi@example.com",
      phone_number: "+967733456789",

      is_male: false,
      country: "اليمن",
      city: "عدن",
      language_code: "ar",
      is_new_muslim: false,
      birth_date: "2004-09-25T00:00:00Z",
      last_reels_id: 88,
    },
  },
  {
    id: "usr_rec_03",
    name: "جون مارتن",
    academic: "مركز النور لتعليم المهتدين الجدد",
    teacher: "الداعية بلال فيليبس",
    mentor: "أ. طارق حسان",
    data: {
      id: "c9d7a5b3-9012-4e3f-b5c6-333333333333",
      created_at: "2026-02-20T14:45:00Z",
      name: "جون مارتن",
      email: "john.martin@example.com",
      phone_number: "+14155550199",
      is_male: true,
      country: "الولايات المتحدة",
      city: "دالاس",
      language_code: "en",
      is_new_muslim: true,
      birth_date: "1999-11-03T00:00:00Z",
      last_reels_id: 42,
    },
  },
];

export default function User() {
  return (
    <>
         <div className="title-ui">
  <h1>All Student</h1>
 </div>
          <div className="filter-data">
            <div className="list">
        <ListSelect />

            </div>
            <div className="new-student">
             <Link to="/newStudent" className="btn">New Student</Link>  

            </div>
      </div>
        <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Id</TableCell>
            <TableCell align="left">Academic</TableCell>
            <TableCell align="left">Mentor</TableCell>
            <TableCell align="left">Teacher</TableCell>
            <TableCell align="left">Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}