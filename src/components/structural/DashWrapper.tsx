import { FC, useState } from "react"
import { Button, Dropdown, Layout, MenuProps, Space } from "antd"
import { SideBar } from "./SideBar"
import { Outlet } from "react-router-dom"
import { DollarCircleOutlined, DownOutlined, LockOutlined, LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined, UserOutlined } from "@ant-design/icons"
import { Content, Header } from "antd/es/layout/layout"

export const DashWrapper: FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  
  const items: MenuProps['items'] = [
    {
      icon:<LockOutlined/>,
      label: "Change Password",
      key: '0',
    },
    {
      icon:<LogoutOutlined/>,
      label: "Sign out",
      key: '1',
    }
  ];

  return (
      <Layout className="w-screen h-screen overflow-hidden">
        <SideBar collapsed={collapsed}/>
        <Layout>
            <Header className="bg-white" style={{background:"white", padding:0}}>
              <Space className="w-full h-full justify-between items-center pr-4">
                <Button type="text" style={{borderRadius:0, height:"64px"}} onClick={()=>{setCollapsed(!collapsed)}}>
                  {collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined />}
                </Button>
                <Space>
                  <DollarCircleOutlined/>
                  <p className="font-bold">9,528,189.00</p>
                  <Dropdown menu={{items}} trigger={['click']} placement="bottomRight">
                      <span className="font-bold hover:cursor-pointer" >
                        <UserOutlined/> Board Black Magic <DownOutlined/>
                      </span>
                  </Dropdown>
                </Space>
              </Space>
            </Header>
            <Content><Outlet/></Content>
        </Layout>
      </Layout>
  )
}