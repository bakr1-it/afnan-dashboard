import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { getPendingUser } from '../../services/subepaseServicese';
import { useEffect, useMemo, useRef, useState } from 'react';
import Loading from '../components/Loading';
import { useAuth } from '../../context/AuthContext';
import {  Navigate } from 'react-router-dom';
import { updateUserToAccept } from '../../services/subepaseServicese';
import { useAcademicLanguage } from '../../context/AcademicLnaguage';
import Modal from '../components/Modal';
import ListSelect from '../components/ListSelect';
import type { SelectChangeEvent } from '@mui/material/Select';
import AlertSuccess from '../components/AlertSuccess';
import { clearStudentCache } from './Users';
import { useLanguageContext } from '../../context/LanguageContext';
 interface UserData {
  id: string;
  name: string;
  email: string;
  language_code?: string | null;


}
interface alertTypeInfo{
typeAlert : "success"|"error"|"warning"|"info",
message:string, 
isShow:boolean,  
}

let pendingStudent: UserData[] | null= null;


export default function StudentNotAccept() {
const {teachers}= useAcademicLanguage();
  const {t} = useLanguageContext();
  const [showAlert,setShowAlert]= useState<alertTypeInfo>({typeAlert:"success",message:"",isShow:false});


const listTeacher= useMemo(()=>{

const arr:Record<string,string> ={};
teachers.forEach(t=> arr[t.id] = t.name);
return arr;

},[teachers]);

  const [loading,setLoading]=useState(true);
  const [isShowModal,setIsShowModal]= useState(false);
    const [rows,setRows]= useState<UserData[]>([]);
    const [selectTeacher,setSelectTeacher]= useState('');
    const [confirmIsShowModal,setConfirmIsShowModal]=useState(false);
    const idRef= useRef("");



    useEffect(()=>{
        if(pendingStudent){
          setRows(pendingStudent);
          setLoading(false);

            return 
        }
        setLoading(true);
        getPendingUser()
        .then((data)=>{
            pendingStudent=data;
            setRows(data);

            
        })
        .catch((error)=>{
            console.log(error)
        })
        .finally(()=>{
            setLoading(false);

        })

    },[])

    const {profile} = useAuth();
  if(!["admin","super admin"].includes(profile?.role))  return  <Navigate to="/dashboard" replace/>;
    
  const handelShowModal= (id:string)=>{
    console.log("show modal ");
    setIsShowModal(true);
    idRef.current=id;
  }
  const handelIsHideModal = ()=>{
    setIsShowModal(false);
    setSelectTeacher('');
    idRef.current="";

  }
  const handelOnCloseConfirmModal =()=>{
    setConfirmIsShowModal(false);
  }
  const handelOnChangeTeacher = (ev:SelectChangeEvent)=>{
  setSelectTeacher(ev.target.value);
}

const handelChangeAcceptUserWithTeacher = ()=>{
  if(selectTeacher.trim()==""){
    setConfirmIsShowModal(true);
    return;
  }
  updateUserToAccept(idRef.current ,selectTeacher)
  .then((data)=>{
  setShowAlert({typeAlert:"success",  message: t("student") + ' ' + data.name + ' ' + t("studentAcceptedSuccess") , isShow:true});  
clearStudentCache();
setRows((prev)=>prev.filter(row=>row.id !==data.id));
setIsShowModal(false);
setSelectTeacher("");
idRef.current="";
}).catch((error)=>{
         setShowAlert({typeAlert:"error",message:error.message , isShow:true});

    console.log(error);

  })
  
}
const handelChangeAcceptUser = ()=>{
  updateUserToAccept(idRef.current )
  .then((data)=>{
  setShowAlert({typeAlert:"success",  message: t("student") + ' ' + data.name + ' ' + t("studentAcceptedSuccess") , isShow:true});  
clearStudentCache();
setRows((prev)=>prev.filter(row=>row.id !==data.id));
setIsShowModal(false);
setConfirmIsShowModal(false);
setSelectTeacher("");
idRef.current="";

}).catch((error)=>{
         setShowAlert({typeAlert:"error",message:error.message , isShow:true});
    console.log(error);

  })
  
}



  return (
      <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">{t("id")}</TableCell>
            <TableCell align="left">{t("name")}</TableCell>
            <TableCell align="left">{t("email")}</TableCell>
            <TableCell align="left">{t("language")}</TableCell>
            <TableCell align="left">{t("action")}</TableCell>
          </TableRow>
        </TableHead>
            {!loading ?
            <TableBody>
                {rows.length>0 ? rows.map((row)=>(
                             <TableRow
         
         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
     
              <TableCell align="left">{row.id}</TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.language_code}</TableCell>
              <TableCell align="left">
                <button className='btn btn-accept-student text-white p-1' onClick={()=>handelShowModal(row.id)} >
                <svg xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 24 24"
                  fill="white" 
                  className="size-6">
                <path fillRule="evenodd" 
                d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                 clipRule="evenodd" />
                </svg>

                </button> </TableCell>
            </TableRow>
                )) :
                         <TableRow
         
         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
     
              <TableCell align="right" colSpan={5}>{t("noPendingStudent")}</TableCell>
         
            </TableRow>
                }

            
         

    
             
         </TableBody>
         : 
         <TableBody >
         

            <TableRow
         
         sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
         >
     
              <TableCell align="right" colSpan={5}> <Loading /></TableCell>
        
            </TableRow>
             </TableBody>
    }
      </Table>
      {isShowModal && <Modal open={isShowModal} onClose={handelIsHideModal} width={600}> 
        <div className=''>
        <p>{t("selectTeacher")}</p>
        <ListSelect dataObj={listTeacher} selectData={selectTeacher} setSelectData={handelOnChangeTeacher} />
        <button className='btn mt-4' onClick={handelChangeAcceptUserWithTeacher}>
          {t("accept")}

        </button>

        
        </div>
        
         </Modal>}
         {confirmIsShowModal && <Modal width={600} open={confirmIsShowModal} onClose={handelOnCloseConfirmModal}>
          <div className='space-y-6 space-x-4'>
            <p className='text-center'>{t("acceptStudentWithoutTeacher")}</p>
          <button className='btn' onClick={handelChangeAcceptUser}>
            {t("accept")}

          </button>
          <button className='cancel' onClick={handelOnCloseConfirmModal}>
            {t("cancel")}
            
          </button>
          </div>
          
          </Modal>}
                  <AlertSuccess type={showAlert.typeAlert} message={showAlert.message} isShow={showAlert.isShow} onClose={()=> setShowAlert((prev)=>({...prev , isShow:false}))}/>
          
    </TableContainer>
  )
}
