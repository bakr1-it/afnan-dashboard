import Input from "../components/Input";
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import {  City }  from 'country-state-city';
import ListSelect from "../components/ListSelect";
import AutoCompliate from "../components/AutoCompliate";
import MailFmail from "../components/MailFmail";;
import { listCountryWithIso } from "../constants/country";
import inserRow from "../../services/subepaseServicese";
import IconLoad from "../components/IconLoad";
import AlertSuccess from "../components/AlertSuccess";
import { vaildatedBeforeSend } from "../../helper";
import { useAcademicLanguage } from "../../context/AcademicLnaguage";
import React, {  useMemo, useRef, useState, type SyntheticEvent } from 'react';
import Checked from "../components/Checked";
import type { SelectChangeEvent } from "@mui/material/Select";

export default function NewStudent() {
   /**
    * todo use state for form 
    */
   const [phone, setPhone] = useState('');
   const [country ,setCountry]= useState('');
    const [selectAcademic,setSelectAcademic] = useState('');
   const [listCity,setListCity]=useState<string[]>([]);
   const [selectCity,setSelectCity]=useState('');
    const [selectLang,setSelectLang]= useState('');

interface alertTypeInfo{
typeAlert : "success"|"error"|"warning"|"info",
message:string, 
isShow:boolean,  
}

    const [showAlert,setShowAlert]= useState<alertTypeInfo>({typeAlert:"success",message:"",isShow:false});
    
    
    const [selectTeacher,setSelectTeacher]=useState('');

    /**
     * ! end use state for form 
     */

    /**
     * todo handel when send form
     */
    const [isLoading,setIsLoading]= useState(false);
    const [errors,setErros] = useState<Record<string,string|boolean>>(
    {name:"", email:"" , password:"",country:"",language_code:"",is_male:false,academy_id:"",phone_number:"",city:'',teacher_id:''}
     );
/**
 * ! end handel when send form
 */

     
/**
 * todo use ref for form data 
 */
        const refName= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
        const refEmail= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
        const refPassword= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
        const refChecked= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
        const refIsNewMuslim= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
        const refDate= useRef<HTMLInputElement>(null) as React.RefObject<HTMLInputElement>;
     /**
      * ! end use ref for form data 
      */

/**
 * todo use context for academic and language and teacher 
 */
  const {academies,languagues,teachers} = useAcademicLanguage();
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
 const teachersType= useMemo(()=>{
   const teacherMap:Record<string,string>={};
     teachers.forEach((teacher)=>{
     teacherMap[teacher.id]= teacher.name;
   })
   return teacherMap;
 },[teachers])

 /**
 * ! use context for academic and language and teacher 
 */

 /**
  * todo all function for change value in input and select
  */
const handelChangecountry= (ev:SelectChangeEvent)=>{
setCountry(ev.target.value);
const iso = ev.target.value;
 setListCity( City.getCitiesOfCountry(iso)?.map((c)=>c.name) || []);
} 
const handelChangeCity = (_ev:React.SyntheticEvent, value: string | null)=>{
 setSelectCity(value || '');
}

const handelOnChangeAcademic = (ev:SelectChangeEvent)=>{
setSelectAcademic(ev.target.value);

}
const handelOnChangeLanguage = (ev: SelectChangeEvent)=>{
setSelectLang(ev.target.value);

}
const handelOnChangeTeacher = (ev: SelectChangeEvent)=>{
setSelectTeacher(ev.target.value);

}
/**
 * ! end all function for change value in input and select 
 */

     function handelOnSubmit(ev :SyntheticEvent<HTMLFormElement> ){
     ev.preventDefault();
  const payload= {
     name:refName.current.value,
     email:refEmail.current.value,
     password:refPassword.current.value,
     country:country,
     language_code:selectLang,
     teacher_id:selectTeacher,
     is_new_muslim:refIsNewMuslim.current.checked,
     birth_date:refDate.current.value,
     city:selectCity,
     is_male:refChecked.current.checked,
     phone_number:phone,

  }


  let newError :Record<string,string>={};
newError = vaildatedBeforeSend(payload);


if(payload.phone_number.length <=7){
  newError["phone_number"]="Invalid phone number";
}
  setErros(newError);
  
  if(Object.keys(newError).length >0){
     return;
  }
  
  
  setIsLoading(true);
  

  inserRow({tableName:"users",payload:payload})
  .then((data)=>{
        setShowAlert({typeAlert:"success",  message: ' student '+' ' +data.data.name + 'created has been success' , isShow:true});  
refName.current.value="";
refEmail.current.value="";
refPassword.current.value="";
refDate.current.value="";
setCountry("");
setPhone("");
setSelectLang("");
setSelectAcademic("");
setSelectCity("");
setSelectTeacher("");

  }).catch((error)=>{
        setShowAlert({typeAlert:"error",message:error.message , isShow:true});
  }).finally(()=>{
     setIsLoading(false);
  })
  
  
    }


   return (
      <>
         <div className="title-ui">
  <h1>Create New Student</h1>
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
              <ListSelect dataObj={TypeAcademic} label="Academic" selectData={selectAcademic} setSelectData={handelOnChangeAcademic}/>
                <p className="error">{errors.country}</p>
         </div>
          <div className="form-group">
              <ListSelect dataObj={languaguesType} label="languages" selectData={selectLang} setSelectData={handelOnChangeLanguage}/>
              <p className="error">{errors.language_code}</p>
            </div>
                   <div className="form-group">
              <ListSelect dataObj={teachersType} label="Teacher" selectData={selectTeacher} setSelectData={handelOnChangeTeacher}/>
              <p className="error">{errors.teacher_id}</p>
            </div>
            <div className="form-group">
                  <PhoneInput
                  className="input-phone"
        defaultCountry="eg"
        value={phone}
        
        onChange={(phone) => setPhone(phone)}
      />
                    <p className="error">{errors.phone_number}</p>

            </div>
            <div className="form-group">
              <ListSelect dataObj={listCountryWithIso} label="Country" selectData={country} setSelectData={handelChangecountry}/>
                <p className="error">{errors.country}</p>
          
            </div>
            <div className="form-group">
              <AutoCompliate disable={country==""} data={listCity} label="City" selectData={selectCity} setSelectData={handelChangeCity}/>
                <p className="error">{errors.city}</p>
           
            </div>
     
           
            <div className="form-group">
                    <Input ref={refDate}  typeInput="date" />
            </div>
            <div className="form-group">
                 <MailFmail refChecked={refChecked} />
                <p className="error">{errors.is_mail}</p>
            </div>
            <div className="form-group">
                <Checked ref={refIsNewMuslim} label="Is New Muslim"/>
            </div>
            

                   <div className="button-submit">
  <button className="btn btn-submite" disabled={isLoading} > {isLoading? <IconLoad />  :"create"}</button>
  </div>
            
        <AlertSuccess type={showAlert.typeAlert} message={showAlert.message} isShow={showAlert.isShow} onClose={()=> setShowAlert((prev)=>({...prev , isShow:false}))}/>
            

        </form>
      </>
      
    
  )
}
