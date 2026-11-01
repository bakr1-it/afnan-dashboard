import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Users from "./view/ui/Users";
import Teachers from "./view/ui/Teachers";
import NewStudent from "./view/ui/NewStudent";
export const router  = createBrowserRouter([
    {
        path: '/' , element:<App />,
        children:[
            {path:'/student' , element:<Users />},
            {path:'/newStudent' , element:<NewStudent />},
            {path:'/teachers' , element:<Teachers />}
        ]
    }
])