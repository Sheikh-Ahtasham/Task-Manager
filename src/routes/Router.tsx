import { Navigate, useRoutes } from "react-router-dom"
import { SIGNIN, SIGNUP } from "./RouteConstants"
import Dashboard from "../pages/Dashboard/Dashboard"
import Main from "../layout/Main"
import UserList from "../pages/UserManagement/UserList"
import CreateUser from "../pages/UserManagement/CreateUser"
import EditUser from "../pages/UserManagement/EditUser"
import ProjectForm from "../pages/Projects/Admin/ProjectForm"
import ProjectList from "../pages/Projects/Admin/ProjectList"
import AssignedProjects from "../pages/Projects/User/AssginedProjects"
import SignIn from "../pages/SignIn/SignIn"
import SignUp from "../pages/SignUp/SignUp"
import ProfileDetail from "../pages/Profile/ProfileDetail"
import TaskBoard from "../pages/TaskBoard/TaskBoard"

const Router: React.FC = () => {
  const routes = useRoutes([
    { path: "/", element: <Navigate to={SIGNIN} /> },
    {
      path: "/dashboard",
      element: <Main />,
      children: [
        { path: "", element: <Dashboard /> },
        {
          path: "profile",
          element: <ProfileDetail />,
        },
        {
          path: "users",
          element: <UserList />,
        },
        {
          path: "create-user",
          element: <CreateUser />,
        },
        {
          path: "edit-user/:id",
          element: <EditUser />,
        },

        { path: "admin/projects", element: <ProjectList /> },

        { path: "admin/projects/create", element: <ProjectForm /> },

        { path: "admin/projects/edit/:id", element: <ProjectForm isEdit /> },

        { path: "admin/projects/:projectId/tasks", element: <TaskBoard /> },

        { path: "user/projects", element: <AssignedProjects /> },

        { path: "user/projects/:projectId/tasks", element: <TaskBoard /> },
      ],
    },

    { path: SIGNIN, element: <SignIn /> },
    { path: SIGNUP, element: <SignUp /> },
  ])

  return routes
}

export default Router
