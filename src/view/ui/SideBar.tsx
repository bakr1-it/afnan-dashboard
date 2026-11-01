import { HiUsers } from "react-icons/hi";
import { NavLink } from "react-router-dom";

import { FaLanguage } from "react-icons/fa6";
import { GiTeacher } from "react-icons/gi";
import { motion, AnimatePresence } from "motion/react";
import logo from "../../assets/images/logo.svg";

interface SideBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const links = [
  { to: "/language", id: 1, icon: <FaLanguage />, text: "language" },
  { to: "/student", id: 2, icon: <HiUsers />, text: "Student" },
  { to: "/teachers", id: 3, icon: <GiTeacher />, text: "Teacher" },
];

export default function SideBar({ isOpen, onClose }: SideBarProps) {
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

            {links.map((link) => (
              <NavLink to={link.to} key={link.id} onClick={onClose}>
                {link.icon}
                <span>{link.text}</span>
              </NavLink>
            ))}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}