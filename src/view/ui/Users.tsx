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
import { useAuth } from '../../context/AuthContext';

import { useAcademicLanguage } from "../../context/AcademicLnaguage";
import type { SelectChangeEvent } from "@mui/material/Select";
import StudentRow ,   { type UserData } from "./StudentRow";
import Input from "../components/Input";
import { useLanguageContext } from "../../context/LanguageContext";
let listStudent : UserData[] | null = null;
export function clearStudentCache(){
listStudent=null;
}
export default function User() {
  const {teachers} = useAcademicLanguage();
  const {t} = useLanguageContext();


  
  const [rows, setRows] = React.useState<UserData[]>(listStudent || []);
  const [loading, setLoading] = React.useState(false);
  const [selectTeacher,setSelectTeacer] = React.useState("");
  type choseSelectFilter = "name" | "email";
const [selectChoseFilterStudent,setSelectChoseFilterStudent]=React.useState<choseSelectFilter>("name");
const [searchInputState,setSearchInputState]=React.useState("");
  

  function handelOnChangeTeacher(ev:SelectChangeEvent){
  setSelectTeacer(ev.target.value);

}
  function handelChangeSelectFilter(ev:SelectChangeEvent){
  setSelectChoseFilterStudent(ev.target.value as choseSelectFilter );

}
function handelOnChangeFilter(ev:React.ChangeEvent<HTMLInputElement>){
  setSearchInputState(ev.target.value);

}

React.useEffect(() => {
  
  if(listStudent){
      setRows(listStudent);
      return;
    }
setLoading(true);
      getStudentsWithTeacherAndReel(profile?.role =="teacher" ? profile?.id:null)
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


  const teacherList  = React.useMemo(()=>{
    const arr :Record<string,string>={"all":t("all")};
    teachers.forEach((t)=>{
      arr[t.id]=t.name;
    }) 
    return arr;
  },[teachers, t])


   
const filterrow=  React.useMemo(()=>{  
  if(searchInputState.length >=2){
     return rows.filter((row)=>row[selectChoseFilterStudent].toLocaleLowerCase().includes(searchInputState.toLocaleLowerCase()));
  }
    if(!selectTeacher || selectTeacher=="all")
    return rows;
  return rows.filter((row)=>row.teacher_id == selectTeacher);
},[rows,selectTeacher,searchInputState])
    const {profile} = useAuth();
   
  return (
    <>
      <div className="title-ui">
        <h1>{t("allStudent")}</h1>
      </div>
      <div className="filter-data">
        <div className="list">
        {["admin","super admin"].includes(profile?.role) && 
         <div className="teacher">
           <p>{t("selectStudentForTeacher")}</p>
          <ListSelect dataObj={teacherList} selectData={selectTeacher} setSelectData={handelOnChangeTeacher} />
         </div>
        }
        {profile?.role !=="student" && 
         <div className="filter-studnet">
               <p>{t("selectStudent")}</p>
               <div className="filter-student-list">

           <ListSelect dataObj={{email: t("email"), name: t("name")}} hidNone={true} selectData={selectChoseFilterStudent} setSelectData={handelChangeSelectFilter}/>
           <Input value={searchInputState} setStateValue={handelOnChangeFilter} />
               </div>
         </div>
        }
        </div>
        {profile?.role !== "student" && 
        <div className="new-student">
          <Link to="/newStudent" className="btn">
            {t("newStudent")}
          </Link>
        </div>
        }
      </div>
      <TableContainer component={Paper} elevation={1} sx={{ borderRadius: 2 }}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell align="left">{t("name")}</TableCell>
              <TableCell align="left">{t("email")}</TableCell>
              <TableCell align="left">{t("phone")}</TableCell>
              <TableCell align="left">{t("teacher")}</TableCell>
              <TableCell align="left">{t("level")}</TableCell>
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
                {t("noStudent")}
                </TableCell>
              </TableRow>

            </TableBody>
            }
        </Table>
      </TableContainer>
    </>
  );
}
