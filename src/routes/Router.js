import { jsx as _jsx } from "react/jsx-runtime";
import { Navigate, useRoutes } from "react-router-dom";
import { SIGNIN, SIGNUP } from "./RouteConstants";
import Dashboard from "../pages/Dashboard/Dashboard";
import Main from "../layout/Main";
import UserList from "../pages/UserManagement/UserList";
import CreateUser from "../pages/UserManagement/CreateUser";
import EditUser from "../pages/UserManagement/EditUser";
import ProjectForm from "../pages/Projects/Admin/ProjectForm";
import ProjectList from "../pages/Projects/Admin/ProjectList";
import AssignedProjects from "../pages/Projects/User/AssginedProjects";
import SignIn from "../pages/SignIn/SignIn";
import SignUp from "../pages/SignUp/SignUp";
import ProfileDetail from "../pages/Profile/ProfileDetail";
import TaskBoard from "../pages/TaskBoard/TaskBoard";
const Router = () => {
    const routes = useRoutes([
        { path: "/", element: _jsx(Navigate, { to: SIGNIN }) },
        {
            path: "/dashboard",
            element: _jsx(Main, {}),
            children: [
                { path: "", element: _jsx(Dashboard, {}) },
                {
                    path: "profile",
                    element: _jsx(ProfileDetail, {}),
                },
                {
                    path: "users",
                    element: _jsx(UserList, {}),
                },
                {
                    path: "create-user",
                    element: _jsx(CreateUser, {}),
                },
                {
                    path: "edit-user/:id",
                    element: _jsx(EditUser, {}),
                },
                { path: "admin/projects", element: _jsx(ProjectList, {}) },
                { path: "admin/projects/create", element: _jsx(ProjectForm, {}) },
                { path: "admin/projects/edit/:id", element: _jsx(ProjectForm, { isEdit: true }) },
                { path: "admin/projects/:projectId/tasks", element: _jsx(TaskBoard, {}) },
                { path: "user/projects", element: _jsx(AssignedProjects, {}) },
                { path: "user/projects/:projectId/tasks", element: _jsx(TaskBoard, {}) },
            ],
        },
        { path: SIGNIN, element: _jsx(SignIn, {}) },
        { path: SIGNUP, element: _jsx(SignUp, {}) },
    ]);
    return routes;
};
export default Router;
