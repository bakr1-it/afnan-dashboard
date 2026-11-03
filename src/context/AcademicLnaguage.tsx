import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getTable, getTeacherNameId } from "../services/subepaseServicese";
interface TypeLnaguage{
  name:string,
  code:string,
  is_active:boolean,

}
interface TypeAcademic{
  name:string,
  email:string,
  id:string,
  created_at:string,

}
interface Teachers {
    name:string,
    id:string,
}
interface LanguageAcademicType{
    academies:TypeAcademic[];
    languagues:TypeLnaguage[];
    teachers:Teachers[],

}
const AcademicLanguageContext= createContext<LanguageAcademicType | undefined >(undefined);
export function AcademicLanguageData({children}:{children:ReactNode}){

const [academies,setAcademies]=useState<TypeAcademic[]>([]);
const [languagues,setLanguagues]=useState<TypeLnaguage[]>([]);
const [teachers,setTeachers]=useState<Teachers[]>([]);

useEffect(()=>{
    getTable("academies")
    .then((data)=>{
        setAcademies(data);
    }).catch((error)=>{
        console.log("this error in fule academic language context for academies");
        console.log(error)
    })
    getTable("languages")
    .then((data)=>{
        setLanguagues(data);
    }).catch((error)=>{
     console.log("this error in fule academic language context for language");
        console.log(error)
    })
    getTeacherNameId()
    .then((data)=>{
        setTeachers(data);
  
    }).catch((error)=>{
             console.log("this error in fule academic language context for teacher id ");
        console.log(error)
    })

},[]);    

return (
    <AcademicLanguageContext.Provider value={{academies,languagues,teachers}}>
        {children}

    </AcademicLanguageContext.Provider>
)
} 
export function useAcademicLanguage(){
    const context= useContext(AcademicLanguageContext);
if (!context) {
        throw new Error("useAcademicLanguage must be used within an AcademicLanguageData provider");
    }
    return context;
}
