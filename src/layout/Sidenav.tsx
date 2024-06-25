import React from "react"
import { Menu } from "antd"
import { NavLink } from "react-router-dom"

const Sidenav: React.FC = () => {
  const user = localStorage.getItem("user")
  const isAdmin = user && JSON.parse(user).role === "admin"
  const isUser = user && JSON.parse(user).role === "user"

  return (
    <>
      <div className="flex items-center p-4">
        <span className="text-lg font-bold">Task Manager</span>
      </div>
      <hr className="my-2" />
      <Menu mode="inline" className="border-0">
        <Menu.Item key="dashboard">
          <NavLink to="" className="flex items-center">
            <span className="label">Dashboard</span>
          </NavLink>
        </Menu.Item>

        {isAdmin && (
          <>
            <Menu.Item key="allProjects">
              <NavLink to="admin/projects" className="flex items-center">
                <span className="label">All Projects</span>
              </NavLink>
            </Menu.Item>

            <Menu.Item key="users">
              <NavLink to="users" className="flex items-center">
                <span className="label">Users</span>
              </NavLink>
            </Menu.Item>
          </>
        )}

        {isUser && (
          <>
            <Menu.Item key="myProjects">
              <NavLink to="user/projects" className="flex items-center">
                <span className="label">My Projects</span>
              </NavLink>
            </Menu.Item>
          </>
        )}
      </Menu>
    </>
  )
}

export default Sidenav
