import React, {useEffect, useState,Suspense} from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {router} from "./router";
import {generateRoutes} from "./utils/generateRoutes";
import {getMenu} from "./api/users";
import {useDispatch, useSelector} from "react-redux";
import {setMenu} from "./store/login/authSlice";
import {Spin} from "antd";

function App() {
    console.log(process.env.REACT_APP_API_URL)
    const {token,menuList} = useSelector((state:any) => state.authSlice)
    const [myRouter, setMyRouter] = useState<any>(null)
    const dispatch = useDispatch();
    useEffect(()=>{
        async function loadData(){
            const {data} = await getMenu()
            if (data.length){
                dispatch(setMenu(data))
                const myRoutes = [...router]
                myRoutes[0].children = generateRoutes(data);
                myRoutes[0].children[0].index = true
                setMyRouter(createBrowserRouter(myRoutes))
            }else{
                setMyRouter(createBrowserRouter(router))
            }
        }
        loadData()
    },[token])
    if (myRouter){
        return (
            <div className="App">
                <Suspense fallback={<Spin></Spin>}>
                    <RouterProvider router={myRouter}></RouterProvider>
                </Suspense>
            </div>
        );
    }else {
        return <Spin></Spin>
    }


}

export default App;
