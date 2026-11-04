import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getTable } from "../services/subepaseServicese";
import { useAuth } from "./AuthContext";

interface TypeLnaguage {
  name: string;
  code: string;
  is_active: boolean;
}

interface TypeAcademic {
  name: string;
  email: string;
  id: string;
  created_at: string;
}

interface Teachers {
  name: string;
  id: string;
}

type refreshTable = "academies" | "languages" | "teachers";
interface LanguageAcademicType {
  academies: TypeAcademic[];
  languagues: TypeLnaguage[];
  teachers: Teachers[];
  isLoading:boolean,
  refreshTable:(tableName?:refreshTable)=>Promise<void>,
}

const AcademicLanguageContext = createContext<LanguageAcademicType | undefined>(undefined);

export function AcademicLanguageData({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [academies, setAcademies] = useState<TypeAcademic[]>([]);
  const [languagues, setLanguagues] = useState<TypeLnaguage[]>([]);
  const [teachers, setTeachers] = useState<Teachers[]>([]);
  const [isLoading,setIsLoading]= useState(false);
const refreshTable = async function(tableName?:refreshTable){

try{
  setIsLoading(true);
  if(!tableName || tableName=="academies"){
    const data= await getTable("academies");
  setAcademies(data);
}if(!tableName || tableName=="languages"){
  const data= await getTable("languages");
  setLanguagues(data);
  
}if(!tableName || tableName=="teachers"){
  const data= await getTable("teachers");
  setTeachers(data);
  
}


}catch(error){
      console.error(`Error refreshing ${tableName || "all"}:`, error);
} finally{
  setIsLoading(false);

}


}


  useEffect(() => {
    if (!isAuthenticated) {
      setAcademies([]);
      setLanguagues([]);
      setTeachers([]);
      return;
    }



refreshTable();
  }, [isAuthenticated]);

  return (
    <AcademicLanguageContext.Provider value={{ academies, languagues, teachers,isLoading , refreshTable }}>
      {children}
    </AcademicLanguageContext.Provider>
  );
}


export function useAcademicLanguage() {
  const context = useContext(AcademicLanguageContext);
  if (!context) {
    throw new Error("useAcademicLanguage must be used within an AcademicLanguageData provider");
  }
  return context;
}