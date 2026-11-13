import { Navigate, Outlet } from "react-router-dom"
import SideBar from "./view/ui/SideBar"
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import {  useState } from "react";
import DropDown from "./view/ui/DropDown";
import { useAuth } from "./context/AuthContext";
import Loading from "./view/components/Loading";

function App() {
  /**
   * todo 
   * use state
   */
const [isOpen , setIsOpen]= useState(false);
const {session ,profile,isLoading}= useAuth();
const handleOnOpen = ()=>{
  setIsOpen(!isOpen);
}
if(isLoading && !profile){
  return (
  <div className="container-loading">
<Loading />
    </div>
  )
}
if (!isLoading && (!session || !profile)) {
  return <Navigate to="/login" replace />;
}
/**
 * ! 
 * end for use state
 */
/**
 * todo 
 * handel function 
*/
/**
 * !
 * end handel function 
 */

  return (
    
    <div className="contianer-layout scroll-smooth">
      
              <SideBar isOpen={isOpen} onClose={handleOnOpen} />

      <div className="content">
        <header className="header-app">
<button className="sidebar-icon" onClick={handleOnOpen}>
<HiOutlineMenuAlt2/>

</button>
          
          <div className="user-info">
           <DropDown />

          </div>

        </header>


        
        <main className="outlet">
      <Outlet />

        </main>
      </div>

    </div>
  

  )
}

export default App
