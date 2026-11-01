import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Users from "./view/ui/Users";
import Teachers from "./view/ui/Teachers";
import NewStudent from "./view/ui/NewStudent";
import NewTeacher from "./view/ui/NewTeacher";
import Lnaguage from "./view/ui/Lnaguage";
import NewLanguage from "./view/ui/NewLanguage";
import Academic from "./view/ui/Academic";
import NewAcademic from "./view/ui/NewAcademic";
export const router  = createBrowserRouter([
    {
        path: '/' , element:<App />,
        children:[
            {path:'/student' , element:<Users />},
            {path:'/academic' , element:<Academic />},
            {path:'/language' , element:<Lnaguage />},
            {path:'/language' , element:<Lnaguage />},
            {path:'/teachers' , element:<Teachers />},
            {path:'/newStudent' , element:<NewStudent />},
            {path:'/newTeacher' , element:<NewTeacher />},
            {path:'/newLnaguage' , element:<NewLanguage />},
            {path:'/NewAcademic' , element:<NewAcademic />},
        ]
    }
])