import { FC } from "react"
import '../../App.css'
import { Button, Form, FormProps, Input, message, Space } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from "@ant-design/icons"
import { LoginRequest } from "./models/request"
import { useAuth } from "../../shared/hooks/useAuth"
import { useNavigate } from "react-router-dom"


export const LoginPage: FC =() => {
  const navigate = useNavigate();
  const {login,loading, error} = useAuth();
  const [form] = Form.useForm();

  const handleLogin: FormProps<LoginRequest>['onFinish'] = async (formValues) => {
    try{
      const values = await form.validateFields();
      console.log(values);
      await login(formValues);
      navigate('/');
    }
    catch(e){
      message.error(error);
    }
  };

  return (
    <>
      <div className="w-2xl flex flex-col items-center">
        <h1 className="text-3xl mb-6">- LOGIN -</h1>
        <Form form={form}  onFinish={handleLogin} layout="vertical">
          <Space direction="vertical"  style={{width:"350px"}}>
            <Form.Item name="username" rules={[{ required: true, message: 'Please input your username' }]}>
              <Input
                placeholder="Username"
                inputMode="numeric"
                pattern="[0-9]*" 
                prefix={<UserOutlined/>}
                count={{
                  max: 11,
                  strategy: (txt) => txt.length,
                  exceedFormatter: (txt) => txt.slice(0, 11),
                }}
                />
            </Form.Item>
            <Form.Item name="password"  rules={[{ required: true, message: 'Please input your password' }]}>
              <Input.Password placeholder="Password" prefix={<LockOutlined/>} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
            </Form.Item>
            <Button type="primary" block htmlType="submit" loading={loading}>Login</Button>
          </Space>
        </Form>
        <div className="h-64"></div>
      </div>
    </>
  )
  }