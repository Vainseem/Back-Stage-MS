import {useSelector} from "react-redux";
import React ,{ useEffect} from "react";
import {useNavigate} from "react-router-dom";
interface IProps {
    needLogin:boolean;
    redirectTo:string;
    children:React.ReactNode;
}
function RequireAuth({needLogin, redirectTo, children}: IProps) {
    const navigate = useNavigate()
    const {token} = useSelector((state:any) => state.authSlice)
    const isLogin = !!token //token?true:false的简化
    useEffect(() => {
        if (isLogin!==needLogin) {
            navigate(redirectTo)
        }
    },[needLogin, redirectTo,isLogin])
    return needLogin === isLogin ? <>{children}</> : <></>
}
export default RequireAuth;