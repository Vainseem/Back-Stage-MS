import logo from "../../assets/logo.png"
import bg from "../../assets/bg.jpg"
import lgbg from "../../assets/lgbg.jpg"
import './index.scss'
import { Button, Form, Input } from 'antd';
import { UserOutlined,LockOutlined} from '@ant-design/icons';
import {login} from "../../api/users";
import {message} from "antd";
import {setToken} from "../../store/login/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

type FieldType = {
    username?: string;
    password?: string;
};
function  Login(){
    const navigate = useNavigate();
    const [messageApi,contextHolder] = message.useMessage()
    const dispatch = useDispatch();
    const [form] = Form.useForm()
    const [isLoading,setIsLoading] = useState<boolean>(false);
    function handleLogin():void{
        form.validateFields().then(async (res:any) => {
            setIsLoading(true);
            const {data:{token,username,btnAuth}}= await login(res)
            setIsLoading(false);
            messageApi.success('登陆成功')
            dispatch(setToken(token))
            sessionStorage.setItem('username',username)
            sessionStorage.setItem('btnAuth',JSON.stringify(btnAuth))
            navigate('/dashboard',{replace:true})//替代掉原本的页面 不让用户返回
            window.location.reload()
        }).catch(() => {
            messageApi.error('账号或密码错误')
            setIsLoading(false);
        })

    }
    return    <>
        {contextHolder}
        <div className='login' style={{backgroundImage:`url(${bg})`}}>

            <div className="lgbg" style={{backgroundImage:`url(${lgbg}`}}>
                <div className="part">
                    <div className="title">
                        <div className="logo">
                            <img src={logo} width={100}/>
                        </div>
                        <h1>智慧园区管理平台</h1>
                    </div>
                    <Form form={form}
                    >
                        <Form.Item<FieldType>
                            name="username"
                            rules={[{ required: true, message: '请输入用户名' }]}
                        >
                            <Input prefix={<UserOutlined />}/>
                        </Form.Item>

                        <Form.Item<FieldType>
                            name="password"
                            rules={[{ required: true, message: '请输入密码' }]}
                        >
                            <Input.Password prefix={<LockOutlined />}/>
                        </Form.Item>
                        <Form.Item>
                            <Button loading={isLoading} type="primary" style={{width:'100%'}} onClick={handleLogin}>
                                登陆
                            </Button>
                        </Form.Item>

                    </Form>
                </div>
            </div>

        </div>
    </>

}
export default Login;