import { Outlet } from "react-router-dom"
import SideBar from "./view/ui/SideBar"

function App() {


  return (
    
    <div className="contianer-layout">
      
          <SideBar />

      <div className="content">
        <header>
          header

        </header>


        
        <main>
      <Outlet />

        </main>
      </div>
    app 
    </div>
  

  )
}

export default App
