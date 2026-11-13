import { HiUsers } from "react-icons/hi";
import { NavLink } from "react-router-dom";
import { FaSchool } from "react-icons/fa";

import { FaLanguage } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { motion, AnimatePresence } from "motion/react";
import logo from "../../assets/images/logo.svg";
import { useAuth } from "../../context/AuthContext";
import { TbLayoutDashboard } from "react-icons/tb";
import { FaUserClock } from "react-icons/fa6";
import { useLanguageContext } from "../../context/LanguageContext";
import type { LocalsLangKey } from "../constants/locals";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const links: { to: string; id: number; icon: React.ReactNode; text: LocalsLangKey; role: string[] }[] = [
  { to: "/dashboard", id: 1, icon: <TbLayoutDashboard />, text: "dashboard",role:["super admin","admin","teacher","student"]},
  { to: "/academic", id: 2, icon: <FaSchool />, text: "academic" ,role:["super admin"]},
  { to: "/language", id: 3, icon: <FaLanguage />, text: "language" ,role:["super admin","admin"]},
  { to: "/teachers", id: 4, icon: <GiTeacher />, text: "teacher" ,role:["super admin","admin"]},
  { to: "/student", id: 5, icon: <HiUsers />, text: "student" ,role:["super admin","admin","teacher","student"]},
  { to: "/pending-student", id: 6, icon: <FaUserClock />, text: "pendingStudent" ,role:["super admin","admin"]},
];

export default function SideBar({ isOpen, onClose }: SideBarProps) {

  const {profile} = useAuth();
  const {t, language} = useLanguageContext();
  const slideX = language === "en" ? "-100%" : "100%";
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div onClick={onClose} className="overlay-sidebar" />

          <motion.aside
            key="sidebar"
            initial={{ x: slideX }}
            animate={{ x: 0 }}
            exit={{ x: slideX }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="logo">
              <img src={logo} alt="Afnan Logo" />
              <h1>{t("appName")}</h1>
            </div>

            {links.map((link) => {
              if(!link.role.includes(profile?.role)) return;
              return(

                
                
                <NavLink to={link.to} key={link.id} onClick={onClose}>
               
                  {link.icon}
                  <span>{t(link.text)}</span>
          
              </NavLink>
              )
          }
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
