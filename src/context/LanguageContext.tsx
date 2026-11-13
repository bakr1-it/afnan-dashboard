import {  createContext, useContext, useEffect, useState } from "react";
import { type LocalsKey, type LocalsLangKey , locals } from "../view/constants/locals";

type PropsTypeLanguageContext = {
t:(text:LocalsLangKey)=>string;
toggleChangeLnaguage:()=>void;
language:LocalsKey;

}

const LnaguageContext = createContext<PropsTypeLanguageContext | null> (null);
export function LanguageContextProvider({children}:{children:React.ReactNode}){
const [language,setLanguage]=useState<LocalsKey>(localStorage.getItem("lang") as LocalsKey ?? "ar");
const toggleChangeLnaguage = ()=>{
setLanguage((prev)=>prev=="en" ? "ar" :"en");
}
useEffect(()=>{
    document.documentElement.dir=  language=="en" ? "ltr":"rtl";
localStorage.setItem("lang",language);
},[language])

const t=(text:LocalsLangKey)=>(locals[language] )?.[text] ?? text;
return (
    <LnaguageContext.Provider value={{t,toggleChangeLnaguage,language}}>
        {children}

    </LnaguageContext.Provider>


)
}
export function useLanguageContext(){
    const useLanguage=useContext(LnaguageContext);
    if(!useLanguage)
        throw new Error("useLanguageContext must be used within a LanguageContextProvider");
    return useLanguage;
}
