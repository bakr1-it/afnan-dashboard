import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ListSelect from '../components/ListSelect';
import { Link, Navigate } from 'react-router-dom';
import { getTableTeacher } from '../../services/subepaseServicese';
import  { useEffect, useMemo, useState } from 'react';
import Loading from '../components/Loading';
import { useAcademicLanguage } from '../../context/AcademicLnaguage'; 
import { useAuth } from '../../context/AuthContext';
import type { SelectChangeEvent } from '@mui/material/Select';

interface Teacher {
  id: string;
  name: string;              
  academy_id: string;
  academies: {
    name: string;          
  };
  email: string;
  phone: string;
  password?: string;
  is_male: boolean;
  country: string;
  language_code: string;
  fcm: string | null;
  created_at: string;
}
export default function Teachers() {
  const [teacher,setTeacher]= useState<Teacher[]>([]);
  const [loading,setLoading]= useState(false);
  const [selectAcademic,setSelectAcademic]= useState("");
  const {academies}= useAcademicLanguage();

    const TypeAcademic=  useMemo(()=>{
  const academicMap:  Record<string,string>={};
     academicMap["all"]= "All";
     academies.forEach((academic)=>{
       academicMap[academic.id]= academic.name;
     })
  
     return academicMap;
   },[academies]);
  
  
  const filterTeacherForAcademic = useMemo(()=>{
   
    if(selectAcademic == "all" || !selectAcademic )
      return teacher;  

    return teacher.filter(t=> t.academy_id == selectAcademic);
  },[selectAcademic,teacher]) 
  
   useEffect(()=>{
    setLoading(true);
    getTableTeacher()
    .then((data)=>{
      setTeacher(data);
    }).catch((error)=>{
      console.log(error);
    }).finally(()=>{
      
      setLoading(false);
})

  },[]);

  const handelOnChangeAcademic= (ev:SelectChangeEvent)=>{

    setSelectAcademic(ev.target.value);

  }
    const {profile} = useAuth();
    if(profile?.role == "student") return <Navigate to="/dashboard" replace/>
return (
  <>
       <div className="title-ui">
  <h1>All Teacher</h1>
 </div>
{(profile?.role=="admin" || profile?.role=="super admin" )&& (
              <div className="filter-data">
                 <div className="list">
                  <p>select teacher for academic</p>
             <ListSelect dataObj={TypeAcademic} selectData={selectAcademic} setSelectData={handelOnChangeAcademic}/>
     
                 </div>
                 <div className="new-student">
                <Link to="/newTeacher" className="btn">New Teacher</Link>  
     
                 </div>
                 </div>

)}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Country</TableCell>
            <TableCell align="left">Academic </TableCell>
          </TableRow>
        </TableHead>
        {loading 
        ?
        <TableBody>
            <TableRow
              
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
              <TableCell align="left" colSpan={5}><Loading /></TableCell>
        
      
            </TableRow>

        </TableBody>
        :
        <TableBody>
          
          {filterTeacherForAcademic.map((row) => (
            <TableRow
            key={row.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="left">{row.country}</TableCell>
              <TableCell align="left">{row?.academies?.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
           }
      </Table>
    </TableContainer>
  </>
  );
}
