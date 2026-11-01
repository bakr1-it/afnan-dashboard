import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Users from "./view/ui/Users";
import Teachers from "./view/ui/Teachers";
import NewStudent from "./view/ui/NewStudent";
import NewTeacher from "./view/ui/NewTeacher";
import Lnaguage from "./view/ui/Lnaguage";
import NewLanguage from "./view/ui/NewLanguage";
export const router  = createBrowserRouter([
    {
        path: '/' , element:<App />,
        children:[
            {path:'/student' , element:<Users />},
            {path:'/language' , element:<Lnaguage />},
            {path:'/newStudent' , element:<NewStudent />},
            {path:'/newTeacher' , element:<NewTeacher />},
            {path:'/newLnaguage' , element:<NewLanguage />},
            {path:'/teachers' , element:<Teachers />}
        ]
    }
])