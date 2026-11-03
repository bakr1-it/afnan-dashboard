import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getTable, getTeacherNameId } from "../services/subepaseServicese";
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

interface LanguageAcademicType {
  academies: TypeAcademic[];
  languagues: TypeLnaguage[];
  teachers: Teachers[];
}

const AcademicLanguageContext = createContext<LanguageAcademicType | undefined>(undefined);

export function AcademicLanguageData({ children }: { children: ReactNode }) {
  const { isAuthenticated } = useAuth();
  const [academies, setAcademies] = useState<TypeAcademic[]>([]);
  const [languagues, setLanguagues] = useState<TypeLnaguage[]>([]);
  const [teachers, setTeachers] = useState<Teachers[]>([]);

  useEffect(() => {
    if (!isAuthenticated) {
      setAcademies([]);
      setLanguagues([]);
      setTeachers([]);
      return;
    }

    getTable("academies")
      .then((data) => {
        setAcademies(data || []);
      })
      .catch((error) => {
        console.error("Error fetching academies:", error);
      });

    getTable("languages")
      .then((data) => {
        setLanguagues(data || []);
      })
      .catch((error) => {
        console.error("Error fetching languages:", error);
      });

    getTeacherNameId()
      .then((data) => {
        setTeachers(data || []);
      })
      .catch((error) => {
        console.error("Error fetching teachers:", error);
      });
  }, [isAuthenticated]);

  return (
    <AcademicLanguageContext.Provider value={{ academies, languagues, teachers }}>
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