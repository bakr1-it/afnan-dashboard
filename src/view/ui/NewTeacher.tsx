import MailFmail from "../components/MailFmail";
import ListSelect from "../components/ListSelect";
import { PhoneInput } from 'react-international-phone';
import Input from "../components/Input";
import 'react-international-phone/style.css';
import React, {  useMemo, useRef, useState, type ChangeEvent } from 'react';
import { listCountryWithIso } from "../constants/country";
import { useAcademicLanguage } from "../../context/AcademicLnaguage";
import inserRow from "../../services/subepaseServicese";
import IconLoad from "../components/IconLoad";
import AlertSuccess from "../components/AlertSuccess";
import { vaildatedBeforeSend } from "../../helper";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
export default function NewTeacher() {
  /**
   * todo context for academic and language
   */
 
  const {academies,languagues} = useAcademicLanguage();
  const TypeAcademic=  useMemo(()=>{
const academicMap:  Record<string,string>={};
   academies.forEach((academic)=>{
     academicMap[academic.id]= academic.name;
   })
   return academicMap;
 },[academies]);

 const languaguesType= useMemo(()=>{
   const languageMap:Record<string,string>={};
     languagues.forEach((lang)=>{
     languageMap[lang.code]= lang.name;
   })
   return languageMap;
 },[languagues])
  
  /**
   * ! end context for academic and language
  */

  /**
   * todo state and ref for insert row 
   */
 const [selectAcademic,setSelectAcademic] = useState('');
 const [selectLang,setSelectLang]= useState('');
 const [phone, setPhone] = useState('');
 const [country ,setCountry]= useState('');

   const refName= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
   const refEmail= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
   const refPassword= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
   const refChecked= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;


   /**
   * ! end state and ref for insert row 
  */

   /**
    * todo handel when send data 
    */
     const [isLoading,setIsLoading]= useState(false);
     const [showAlert,setShowAlert]= useState({typeAlert:"",message:"",isShow:false});
     const [errors,setErros] = useState(
      {name:"", email:"" , password:"",country:"",language_code:"",is_mail:null,academy_id:"",phone:""}
     );
     /**
      * ! end handel when send data 
      */

  /**
  *
  * todo all function handel on chagne 
  */
 const handelChangecountry= (ev:React.ChangeEvent<HTMLSelectElement>)=>{
setCountry(ev.target.value);
}
const handelOnChangeAcademic = (ev:React.ChangeEvent<HTMLSelectElement>)=>{
setSelectAcademic(ev.target.value);

}
const handelOnChangeLanguage = (ev:React.ChangeEvent<HTMLSelectElement>)=>{
setSelectLang(ev.target.value);

}

  const {refreshTable} = useAcademicLanguage();


     function handelOnSubmit(ev :SyntheticEvent<HTMLFormElement> ){
     ev.preventDefault();
  const payload= {
     name:refName.current.value,
     email:refEmail.current.value,
     password:refPassword.current.value,
     country:country,
     language_code:selectLang,
     is_male:refChecked.current.checked,
     academy_id:selectAcademic,
     phone:phone,

  }



  let newError :Record<string,string>={};
newError = vaildatedBeforeSend(payload);

  

if(payload.phone.length <=7){
  newError["phone"]="Invalid phone number";
}
  setErros(newError);
  
  if(Object.keys(newError).length >0){
     return;
  }
  
  
  setIsLoading(true);
  
  inserRow({tableName:"teachers",payload:payload})
  .then((data)=>{
        setShowAlert({typeAlert:"success",  message: ' teacher '+' ' +data.data.name + 'created has been success' , isShow:true});  
refName.current.value="";
refEmail.current.value="";
refPassword.current.value="";
setCountry("");
setPhone("");
setSelectLang("");
setSelectAcademic("");
refreshTable("teachers");

  }).catch((error)=>{
        setShowAlert({typeAlert:"error",message:error.message , isShow:true});
  }).finally(()=>{
     setIsLoading(false);
  })
  
  
    }

  /**
   * 
   * ! end all function handel on chagne 
   */
    const {profile} = useAuth();
    if(profile?.role == "student") return <Navigate to="/dashboard" replace/>


  return (
     <>
     <div className="title-ui">
  <h1>Create New Teacher</h1>
 </div>
  <form action="" method="post" className="form form-create-new-user" onSubmit={handelOnSubmit}>
            <div className="form-group">
               <Input ref={refName} label="name"/>
                 <p className="error">{errors.name}</p>
            </div>
            <div className="form-group">
               <Input ref={refEmail} label="email" typeInput="email"/>
                 <p className="error">{errors.email}</p>
            </div>
            <div className="form-group">
               <Input ref={refPassword} label="password" typeInput="password" />
                 <p className="error">{errors.password}</p>
            </div>
            <div className="form-group">
                  <PhoneInput
                  className="input-phone"
                  defaultCountry="eg"
                  value={phone}
                  
                  onChange={(phone) => setPhone(phone)}
                  />
                    <p className="error">{errors.phone}</p>
            </div>
            <div className="form-group">
              <ListSelect dataObj={listCountryWithIso} label="Country" selectData={country} setSelectData={handelChangecountry}/>
                <p className="error">{errors.country}</p>
            </div>
            <div className="form-group">
              <ListSelect dataObj={languaguesType} label="languages" selectData={selectLang} setSelectData={handelOnChangeLanguage}/>
                <p className="error">{errors.language_code}</p>
            </div>
            <div className="form-group">
              <ListSelect dataObj={TypeAcademic} label="Academic" selectData={selectAcademic} setSelectData={handelOnChangeAcademic} />
                <p className="error">{errors.academy_id}</p>
            </div>
            <div className="form-group">
                 <MailFmail refChecked={refChecked}/>
            </div>
                   <div className="button-submit">
  <button className="btn btn-submite" disabled={isLoading} > {isLoading? <IconLoad />  :"create"}</button>
  </div>
            
        <AlertSuccess type={showAlert.typeAlert} message={showAlert.message} isShow={showAlert.isShow} onClose={()=> setShowAlert((prev)=>({...prev , isShow:false}))}/>
            


        </form>
                  </>
      
  )
}
