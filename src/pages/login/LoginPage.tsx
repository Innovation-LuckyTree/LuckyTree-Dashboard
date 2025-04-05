import { FC } from "react"
import '../../App.css'
import { Button, Input, Space } from 'antd'
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined, UserOutlined } from "@ant-design/icons"


export const LoginPage: FC =() => {
  
    return (
      <>
        <div className="w-2xl">
          <h1>- LOGIN -</h1>
          <Space direction="vertical">
          <Input placeholder="Username" className="w-64 mb-2.5" prefix={<UserOutlined/>}/>
          <Input.Password placeholder="Password" className="w-64 mb-2.5"  prefix={<LockOutlined/>} iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
          <Button type="primary" block onClick={() => {}}>Login</Button>
          </Space>
        </div>
      </>
    )
  }