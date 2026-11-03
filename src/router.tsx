import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Users from "./view/ui/Users";
import Teachers from "./view/ui/Teachers";
import NewStudent from "./view/ui/NewStudent";
import NewTeacher from "./view/ui/NewTeacher";
import Lnaguage from "./view/ui/languag";
import NewLanguage from "./view/ui/NewLanguage";
import Academic from "./view/ui/Academic";
import NewAcademic from "./view/ui/NewAcademic";
import Login from "./view/ui/Login";
import SignIn from "./view/ui/SignIn";
import Dashboard from "./view/ui/Dashboard";
import ErrorPage from "./view/ui/ErrorPage";

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signin',
        element: <SignIn />
    },
    {
        path: '/' , element:<App />,
        errorElement:<ErrorPage/>,
        children:[
            {path:'/dashboard' , element:<Dashboard />},
            {path:'/student' , element:<Users />},
            {path:'/academic' , element:<Academic />},
            {path:'/language' , element:<Lnaguage /> },
            {path:'/teachers' , element:<Teachers />},
            {path:'/newStudent' , element:<NewStudent />},
            {path:'/newTeacher' , element:<NewTeacher />},
            {path:'/newLnaguage' , element:<NewLanguage />},
            {path:'/NewAcademic' , element:<NewAcademic />},
            {index:true , element:<Dashboard />},
        ]
    }
]);
