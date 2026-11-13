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
import { useLanguageContext } from '../../context/LanguageContext';
export default function NewLanguage() {
  const { t } = useLanguageContext();
  const refName= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refCode= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refChecked= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  
  interface alertTypeInfo{
typeAlert : "success"|"error"|"warning"|"info",
message:string, 
isShow:boolean,  
}

  const [isLoading,setIsLoading]= useState(false);
  const [showAlert,setShowAlert]= useState<alertTypeInfo>({typeAlert:"success",message:"",isShow:false});
  const [errors,setErros] = useState<Record<string,string>>(
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
        setShowAlert({typeAlert:"success",  message: t("language") + ' ' + data.data.name + ' ' + t("createdSuccess") , isShow:true});  
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
      if(!["super admin","admin"].includes(profile?.role))  return  <Navigate to="/dashboard" replace/>;
  return (
<>
 <div className="title-ui">
  <h1>{t("createNewLanguage")}</h1>
 </div>
       <form action="" method="post" className="form form-create-new-user" onSubmit={handelOnSubmit}>
                  <div className="form-group">
                     <Input ref={refName} label={t("name")}/>
                     <p className="error">{errors.name}</p>
                  </div>
                  <div className="form-group">
                     <Input ref={refCode} label={t("code")} typeInput="text"/>
                     <p className="error">{errors.code}</p>

                  </div>
                  <div className="form-group">
                  <Checked label={t("active")} ref={refChecked}/>
                  </div>
                           <AlertSuccess type={showAlert.typeAlert} message={showAlert.message} isShow={showAlert.isShow} onClose={()=> setShowAlert((prev)=>({...prev , isShow:false}))}/>
                  
                     <div className="button-submit">
                  
                                   
                                    <button className="btn btn-submite" disabled={isLoading} > {isLoading? <IconLoad />  :t("create")}</button>
                                    </div>
                  </form>

</>
  )
}
