import React from "react"
import { Row, Col, Avatar, Button, Dropdown, Menu } from "antd"
import { MenuOutlined, UserOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { SIGNIN } from "../routes/RouteConstants"

interface HeaderProps {
  toggleDrawer: () => void
}

const Header: React.FC<HeaderProps> = ({ toggleDrawer }) => {
  const navigate = useNavigate()

  const handleMenuClick = (e: any) => {
    if (e.key === "profile") {
      navigate("/dashboard/profile")
    } else if (e.key === "logout") {
      localStorage.removeItem("token")
      localStorage.removeItem("user")
      navigate(SIGNIN)
    }
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile">Profile</Menu.Item>
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  )

  return (
    <Row
      justify="space-between"
      align="middle"
      className="bg-slate-100 shadow-sm border-gray-200 p-[18px]"
    >
      <Col>
        <Button type="text" icon={<MenuOutlined />} onClick={toggleDrawer} />
      </Col>
      <Col>
        <Dropdown overlay={menu} trigger={["click"]}>
          <Avatar
            src={
              "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg"
            }
            icon={<UserOutlined />}
            style={{ cursor: "pointer" }}
          />
        </Dropdown>
      </Col>
    </Row>
  )
}

export default Header
