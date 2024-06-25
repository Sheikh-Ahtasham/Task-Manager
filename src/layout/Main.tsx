import React, { useState } from "react"
import { Outlet } from "react-router-dom"
import { Layout, Drawer, Affix } from "antd"
import Sidenav from "./Sidenav"
import Header from "./Header"
import Footer from "./Footer"

const { Content, Sider } = Layout

const Main: React.FC = () => {
  const [visible, setVisible] = useState(true)

  const toggleDrawer = () => setVisible(!visible)

  return (
    <Layout className="min-h-screen">
      <Drawer
        placement="left"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible && window.innerWidth < 1024}
        width={250}
        bodyStyle={{ padding: 0 }}
      >
        <Sidenav />
      </Drawer>
      <Sider
        trigger={null}
        collapsedWidth="0"
        breakpoint="lg"
        onBreakpoint={broken => {
          if (broken) setVisible(false)
        }}
        collapsible
        collapsed={!visible}
        width={250}
        theme="light"
        className={`overflow-y-auto lg:block`}
      >
        <Sidenav />
      </Sider>
      <Layout className={`transition-all duration-300 `}>
        <Affix offsetTop={0}>
          <Header toggleDrawer={toggleDrawer} />
        </Affix>
        <Content className="p-6">
          <Outlet />
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default Main
