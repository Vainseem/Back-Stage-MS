import React from 'react';
import { DownOutlined,PoweroffOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Dropdown, Space } from 'antd';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {clearToken} from "../../store/login/authSlice";

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank">
                个人中心
            </a>
        ),
        icon:<UserOutlined />
    },
    {
        key: '2',
        label: (
            <a target="_blank">
                退出登录
            </a>
        ),
        icon: <PoweroffOutlined />,
    },
];
function MyHeader(){
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onClick:MenuProps['onClick'] = ({key})=>{//这个key得到的就是items里面的key，即1或2
        key == '1' ? navigate('/personal') : logout()
    }
    const logout = ()=>{
        dispatch(clearToken())
        sessionStorage.removeItem('username');
    }
    const username:string =
        sessionStorage.getItem('username')==='user'  ? '普通用户' :
        sessionStorage.getItem('username')==='admin' ? '管理员'  :
            '操控员'
    return <>
        <Dropdown menu={{ items,onClick }}>
            <a onClick={(e) => e.preventDefault()}>
                <Space>
                    欢迎,{username}
                    <DownOutlined />
                </Space>
            </a>
        </Dropdown>
    </>
}
export  default  MyHeader