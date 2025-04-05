
import { Menu } from "antd"
import { Content, Header } from "antd/es/layout/layout"
import Sider from "antd/es/layout/Sider"
import { FC } from "react"
import { getSideMenu } from "../../route/appRoutes"

interface SideBarProps {
  collapsed: boolean
}

export const SideBar: FC<SideBarProps> =({collapsed}) => {
  return (
      <Sider width={250} collapsed={collapsed} breakpoint="md">
        <Header style={{ padding:0}}> 
        </Header>
        <Content className="bg-white h-full">
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            items={getSideMenu()}
          />
        </Content>
      </Sider>
  )
}