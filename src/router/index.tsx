import React from "react";
import RequireAuth from "../utils/RequireAuth";
import {RouteObject} from "react-router-dom";
const Home = React.lazy(()=>import('../page/home'))
const Login = React.lazy(()=>import('../page/login'))
const NotFound = React.lazy(()=>import('../page/404'))


// export const router = createBrowserRouter([
//     {
//         path: "/",
//         element:<RequireAuth needLogin={true} redirectTo='/login'><Home/></RequireAuth>
//     },
//     {
//         path: "/login",
//         element:<RequireAuth needLogin={false} redirectTo='/'><Login/></RequireAuth>
//     },
//     {
//         path: "*",
//         element:<NotFound />
//     },
// ])

export const router:RouteObject[] = [
    {
        path: "/",
        element:<RequireAuth needLogin={true} redirectTo='/login'><Home/></RequireAuth>
    },
    {
        path: "/login",
        element:<RequireAuth needLogin={false} redirectTo='/dashboard'><Login/></RequireAuth>
    },
    {
        path: "*",
        element:<NotFound />
    },
];