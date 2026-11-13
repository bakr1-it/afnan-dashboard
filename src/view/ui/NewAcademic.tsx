
import Input from "../components/Input";
import { useRef, useState, type SyntheticEvent } from "react";
import inserRow from "../../services/subepaseServicese";
import  IconLoad from "../components/IconLoad";
import AlertSuccess from "../components/AlertSuccess";
import { vaildatedBeforeSend } from "../../helper";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useAcademicLanguage } from "../../context/AcademicLnaguage";
import { useLanguageContext } from "../../context/LanguageContext";


export default function NewAcademic() {
   const { t } = useLanguageContext();
   /**
    * todo use ref for all input 
    */
  const refName= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refEmail=  useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  const refPassword=  useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
  /**
   * todo use state for loading data and show alert and show error
   */
  
interface alertTypeInfo{
typeAlert : "success"|"error"|"warning"|"info",
message:string, 
isShow:boolean,  
}

  const [isLoading,setIsLoading]= useState(false);
  const [showAlert,setShowAlert]= useState<alertTypeInfo>({typeAlert:"success",message:"",isShow:false});
  const [errors,setErros] = useState<Record<string,string>>(
   {email:"", name:"",password:''}
  );
  
  /**
   *todo funciton to insert data to supebase 
   */
  const {refreshTable} = useAcademicLanguage();

   function handelOnSubmit(ev :SyntheticEvent<HTMLFormElement> ){
   ev.preventDefault();
const payload= {
   name:refName.current.value,
   email:refEmail.current.value,
   password:refPassword.current.value,
}
let newError :Record<string,any>={};
newError= vaildatedBeforeSend(payload);
setErros(newError);

if(Object.keys(newError).length >0){
   return;
}

setIsLoading(true);

inserRow({tableName:"academies",payload:payload})
.then((data)=>{
      setShowAlert({typeAlert:"success",  message: t("academic") + ' ' + data.data.name + ' ' + t("createdSuccess") , isShow:true});  
      refEmail.current.value="";
      refName.current.value="";
      refPassword.current.value="";
      refreshTable("academies");

}).catch((error)=>{
      setShowAlert({typeAlert:"error",message:error.message , isShow:true});
}).finally(()=>{
   setIsLoading(false);
})


  }
  
const {profile} = useAuth();
    if(profile?.role !== "super admin" )  return <Navigate to="/dashboard" replace/>;

  return (
<>
 <div className="title-ui">
  <h1>{t("createNewAcademic")}</h1>
 </div>
       <form action="" method="post" className="form form-create-new-user" onSubmit={handelOnSubmit}>
                  <div className="form-group">
                     <Input label={t("name")} ref={refName}/>
                     <p className="error">{errors.name}</p>
                  </div>
                  <div className="form-group">
                     <Input label={t("email")} typeInput="email" ref={refEmail}/>
                     <p className="error">{errors.email}</p>
                  </div>
                  <div className="form-group">
                     <Input label={t("password")} typeInput="password" ref={refPassword}/>
                     <p className="error">{errors.password}</p>
                  </div>
                  <div className="button-submit">

                 
                  <button className="btn btn-submite" disabled={isLoading} > {isLoading? <IconLoad />  :t("create")}</button>
                  </div>

                 
         <AlertSuccess type={showAlert.typeAlert} message={showAlert.message} isShow={showAlert.isShow} onClose={()=> setShowAlert((prev)=>({...prev , isShow:false}))}/>
         
                  </form>

</>
  )
}
