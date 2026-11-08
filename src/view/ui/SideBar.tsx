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

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { to: "/dashboard", id: 1, icon: <TbLayoutDashboard />, text: "Dashboard",role:["super admin","admin","teacher","student"]},
  { to: "/academic", id: 2, icon: <FaSchool />, text: "Academic" ,role:["super admin"]},
  { to: "/language", id: 3, icon: <FaLanguage />, text: "language" ,role:["super admin","admin"]},
  { to: "/teachers", id: 4, icon: <GiTeacher />, text: "Teacher" ,role:["super admin","admin","teacher"]},
  { to: "/student", id: 5, icon: <HiUsers />, text: "Student" ,role:["super admin","admin","teacher","student"]},
  { to: "/pending-student", id: 6, icon: <FaUserClock />, text: "Pending Student" ,role:["super admin","admin"]},
];

export default function SideBar({ isOpen, onClose }: SideBarProps) {

  const {profile} = useAuth();
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div onClick={onClose} className="overlay-sidebar" />

          <motion.aside
            key="sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <div className="logo">
              <img src={logo} alt="Afnan Logo" />
              <h1>Afnan</h1>
            </div>

            {links.map((link) => {
              if(!link.role.includes(profile?.role)) return;
              return(

                
                
                <NavLink to={link.to} key={link.id} onClick={onClose}>
               
                  {link.icon}
                  <span>{link.text}</span>
          
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
