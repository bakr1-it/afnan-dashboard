import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import { getStudentsWithTeacherAndReel } from "../../services/subepaseServicese";
import ListSelect from "../components/ListSelect";
import Loading from "../components/Loading";

import { useAcademicLanguage } from "../../context/AcademicLnaguage";
import type { SelectChangeEvent } from "@mui/material/Select";
import StudentRow ,   { type UserData } from "./StudentRow";
let listStudent : UserData[] | null = null;
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

  function handelOnChangeTeacher(ev:SelectChangeEvent){
  setSelectTeacer(ev.target.value);

}

React.useEffect(() => {
  
  if(listStudent){
      setRows(listStudent);
      return;
    }
setLoading(true);
    getStudentsWithTeacherAndReel()
      .then((data) => {
       listStudent = data as any; 
       setRows((data as any) || [])
       
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
              <TableCell align="left">lavel</TableCell>
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
                <StudentRow key={row.id} row={row} />
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
