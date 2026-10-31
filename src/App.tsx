import { Outlet } from "react-router-dom"
import SideBar from "./view/ui/SideBar"
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { useState } from "react";

function App() {
  /**
   * todo 
   * use state
   */
const [isOpen , setIsOpen]= useState(false);
/**
 * ! 
 * end for use state
 */
/**
 * todo 
 * handel function 
*/
const handleOnOpen = ()=>{
  setIsOpen(!isOpen);
}
/**
 * !
 * end handel function 
 */
  return (
    
    <div className="contianer-layout">
      
              <SideBar isOpen={isOpen} onClose={handleOnOpen} />

      <div className="content">
        <header className="header-app">
<button className="sidebar-icon" onClick={handleOnOpen}>
<HiOutlineMenuAlt2/>

</button>
          
          <div className="user-info">
            name user 

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
