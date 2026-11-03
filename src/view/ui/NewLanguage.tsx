import React from 'react'
import Input from '../components/Input'

import { useRef, useState , type SyntheticEvent } from "react";
import AlertSuccess from "../components/AlertSuccess";
import inserRow from "../../services/subepaseServicese";
import  IconLoad from "../components/IconLoad";
import Checked from '../components/Checked';
import { vaildatedBeforeSend } from "../../helper";
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import { useAcademicLanguage } from '../../context/AcademicLnaguage';
export default function NewLanguage() {
  const refName= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refCode= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refChecked= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  

  const [isLoading,setIsLoading]= useState(false);
  const [showAlert,setShowAlert]= useState({typeAlert:"",message:"",isShow:false});
  const [errors,setErros] = useState(
   {name:"", code:""}
  );
  
  const {refreshTable} = useAcademicLanguage();

     function handelOnSubmit(ev :SyntheticEvent<HTMLFormElement> ){
     ev.preventDefault();
  const payload= {
     name:refName.current.value,
     code:refCode.current.value,
     is_acative:refChecked.current.checked
  }
  

  

  let newError :Record<string,string>={};
newError= vaildatedBeforeSend(payload);

  setErros(newError);
  
  if(Object.keys(newError).length >0){
     return;
  }
  
  setIsLoading(true);
  
  inserRow({tableName:"languages",payload:payload})
  .then((data)=>{
        setShowAlert({typeAlert:"success",  message: ' language  '+''+data.data.name + 'created has been success' , isShow:true});  
refName.current.value="";
refCode.current.value="";
refreshTable("languages");

  }).catch((error)=>{
        setShowAlert({typeAlert:"error",message:error.message , isShow:true});
  }).finally(()=>{
     setIsLoading(false);
  })
  
  
    }
      const {profile} = useAuth();
      if(profile?.role !== "super admin" || profile.role !== "admin")  return  <Navigate to="/dashboard" replace/>;
  return (
<>
 <div className="title-ui">
  <h1>Create New Lnaguage</h1>
 </div>
       <form action="" method="post" className="form form-create-new-user" onSubmit={handelOnSubmit}>
                  <div className="form-group">
                     <Input ref={refName} label="name"/>
                     <p className="error">{errors.name}</p>
                  </div>
                  <div className="form-group">
                     <Input ref={refCode} label="code" typeInput="text"/>
                     <p className="error">{errors.code}</p>

                  </div>
                  <div className="form-group">
                  <Checked label="Active" ref={refChecked}/>
                  </div>
                           <AlertSuccess type={showAlert.typeAlert} message={showAlert.message} isShow={showAlert.isShow} onClose={()=> setShowAlert((prev)=>({...prev , isShow:false}))}/>
                  
                     <div className="button-submit">
                  
                                   
                                    <button className="btn btn-submite" disabled={isLoading} > {isLoading? <IconLoad />  :"create"}</button>
                                    </div>
                  </form>

</>
  )
}
