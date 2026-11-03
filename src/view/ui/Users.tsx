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
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
import { getStudentsWithTeacherAndReel } from "../../services/subepaseServicese";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import ListSelect from "../components/ListSelect";
import Loading from "../components/Loading";
import { listCountryWithIso } from "../constants/country";
import { converTimeToDate } from "../../helper";
import { useAcademicLanguage } from "../../context/AcademicLnaguage";
interface UserData {
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

  if (label === "created_at" || label === "birth_date") {
    displayValue = converTimeToDate(value);
  } else if (label === "student_level_progress") {
    if (Array.isArray(value) && value.length > 0) {
      const lastProgress = value[value.length - 1];
      displayValue = lastProgress?.tours?.ar_name || "لا يوجد تقدم";
    } else {
      displayValue = "لا يوجد تقدم";
    }
  } else if (label === "is_male") {
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

function Row({ row }: { row: UserData }) {
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
        <TableCell align="left">{listCountryWithIso[row.country?? ""] || "—"}</TableCell>
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

export default function User() {
  const {teachers} = useAcademicLanguage();

  const teacherList  = React.useMemo(()=>{
    const arr :Record<string,string>={"all":"All"};
    teachers.forEach((t)=>{
      arr[t.id]=t.name;
    }) 
    return arr;
  },[teachers])
  
  const [rows, setRows] = React.useState<UserData[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectTeacher,setSelectTeacer] = React.useState("");

  function handelOnChangeTeacher(ev:React.ChangeEvent<HTMLSelectElement>){
  setSelectTeacer(ev.target.value);

}


  React.useEffect(() => {
    setLoading(true);
    getStudentsWithTeacherAndReel()
      .then((data) => {
        
        setRows(data || []);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
const filterrow=  React.useMemo(()=>{
    if(!selectTeacher || selectTeacher=="all")
    return rows;
  return rows.filter((row)=>row.teacher_id == selectTeacher);
},[rows,selectTeacher])

  return (
    <>
      <div className="title-ui">
        <h1>All Student</h1>
      </div>
      <div className="filter-data">
        <div className="list">
          <p>select student for teacher</p>
          <ListSelect dataObj={teacherList} selectData={selectTeacher} setSelectData={handelOnChangeTeacher} />
        </div>
        <div className="new-student">
          <Link to="/newStudent" className="btn">
            New Student
          </Link>
        </div>
      </div>
      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">Name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">phone</TableCell>
              <TableCell align="left">Teacher</TableCell>
              <TableCell align="left">country</TableCell>
            </TableRow>
          </TableHead>
          {loading ? (
            <TableBody>
              <TableRow>
                <TableCell align="left" colSpan={6}>
                  <Loading />
                </TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {filterrow.map((row) => (
                <Row key={row.id} row={row} />
              ))}
            </TableBody>
            )}
            {!loading && filterrow.length==0 && 
            <TableBody>
                <TableRow>
                <TableCell align="center" colSpan={6}>
                No student For This teacher
                </TableCell>
              </TableRow>

            </TableBody>
            }
        </Table>
      </TableContainer>
    </>
  );
}
