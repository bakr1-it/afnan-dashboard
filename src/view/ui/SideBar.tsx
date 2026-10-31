import { HiUsers } from "react-icons/hi";
import { NavLink } from "react-router-dom"
import { GiTeacher } from "react-icons/gi";
const links =[
    {to:"/student" , id:1, icon:<HiUsers />, text:"Student"},
    {to:"/teachers" ,id:2, icon:<GiTeacher />,   text:"Teacher"},

]
export default function SideBar() {
  return (
    <aside>
        
        {links.map((link)=>( <NavLink to={link.to} key={link.id}>{link.icon} <span>{link.text}</span></NavLink>))}

      
    </aside>
  )
}
