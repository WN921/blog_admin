import { Card, Input, Button, Spin, message } from 'antd';
import { useState } from 'react';
import { UserOutlined, InfoCircleOutlined } from '@ant-design/icons';
import '../static/css/Login.css';
import { login } from '../API/request';

function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const checkLogin = () => {
        setIsLoading(true);
        if (!userName || !password) {
            message.error('用户名和密码不能为空');
            return false;
        }
        login({ userName, password }).then((res) => {
            if (!res) {
                message.error('服务器未响应');
                return false;
            }
            setIsLoading(false);
            if (res.errno !== 0) {
                message.error('用户名或密码错误');
                return false;
            }
            else {
                localStorage.setItem('userId', res.data.userId);
                props.history.push('/AdminIndex');
            }

        })
    };
    return (
        <div className='login-div'>
            <Spin tip='Loading...' spinning={isLoading} className='login-spin' >
                <Card title='博客管理系统' bordered={true} style={{ textAlign: 'center', width: 400 }}>
                    <Input id='userName'
                        size='large'
                        placeholder='Enter your userName'
                        prefix={<UserOutlined />}
                        onChange={(e) => { setUserName(e.target.value) }}
                    />
                    <Input.Password id='password' className='Login-password'
                        size='large'
                        placeholder='Enter your password'
                        prefix={<InfoCircleOutlined />}
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <Button type='primary' size='large' block onClick={checkLogin}>登录</Button>
                </Card>
            </Spin>
        </div>
    )
}

export default Login;