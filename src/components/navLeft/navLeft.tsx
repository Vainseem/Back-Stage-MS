import {  Menu } from 'antd';
import React, {useEffect, useState} from "react";
import icons from './iconList'
import logo from '../../assets/logo.png'
import './index.scss'
import { useSelector} from "react-redux";
import {useLocation, useNavigate} from "react-router-dom";

interface MenuItem {
    key: string;
    icon?:React.ReactNode;
    label: string;
    children?: MenuItem[];
}
interface MenuItemFormData{
    key: string;
    icon:string;
    label:string;
    children?: MenuItemFormData[];
}

function NavLeft() {
    const {menuList} = useSelector((state:any)=>state.authSlice)
    const navigate = useNavigate();
    const location = useLocation()
    const [menuData, setMenuData] = useState<MenuItem[]>([]);
    useEffect(()=>{
        configMenu()
    },[menuList])
    async function configMenu(){
        setMenuData(mapMenuItem(menuList));
    }
    function mapMenuItem(items:MenuItemFormData[]):any {//将icon的字符串通过iconList的对照表转换为组件
        return items.map((item:MenuItemFormData)=> ({
            key: item.key,
            label: item.label,
            children:item.children?mapMenuItem(item.children):null,
            icon:icons[item.icon],
        }))
    }
    function handleClick({key}:{key:string}){
        navigate(key)
    }
    return <div className='navleft'>
        <div className='logo'>
            <img src={logo} alt="" width={18}/>
            <h1>智慧园区</h1>
        </div>
        <Menu
            defaultSelectedKeys={['/dashboard']}
            selectedKeys={[location.pathname]}
            mode="inline"
            theme="dark"
            onClick={handleClick}
            items={menuData}
        />
    </div>
}

export default NavLeft