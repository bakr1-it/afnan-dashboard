import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Users from "./view/ui/Users";
import Teachers from "./view/ui/Teachers";
export const router  = createBrowserRouter([
    {
        path: '/' , element:<App />,
        children:[
            {path:'/student' , element:<Users />},
            {path:'/student' , element:<Users />},
            {path:'/teachers' , element:<Teachers />}
        ]
    }
])