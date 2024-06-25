import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
const Sidenav = () => {
    const user = localStorage.getItem("user");
    const isAdmin = user && JSON.parse(user).role === "admin";
    const isUser = user && JSON.parse(user).role === "user";
    return (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex items-center p-4", children: _jsx("span", { className: "text-lg font-bold", children: "Task Manager" }) }), _jsx("hr", { className: "my-2" }), _jsxs(Menu, { mode: "inline", className: "border-0", children: [_jsx(Menu.Item, { children: _jsx(NavLink, { to: "", className: "flex items-center", children: _jsx("span", { className: "label", children: "Dashboard" }) }) }, "dashboard"), isAdmin && (_jsxs(_Fragment, { children: [_jsx(Menu.Item, { children: _jsx(NavLink, { to: "admin/projects", className: "flex items-center", children: _jsx("span", { className: "label", children: "All Projects" }) }) }, "allProjects"), _jsx(Menu.Item, { children: _jsx(NavLink, { to: "users", className: "flex items-center", children: _jsx("span", { className: "label", children: "Users" }) }) }, "users")] })), isUser && (_jsx(_Fragment, { children: _jsx(Menu.Item, { children: _jsx(NavLink, { to: "user/projects", className: "flex items-center", children: _jsx("span", { className: "label", children: "My Projects" }) }) }, "myProjects") }))] })] }));
};
export default Sidenav;
