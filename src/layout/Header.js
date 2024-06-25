import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Row, Col, Avatar, Button, Dropdown, Menu } from "antd";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { SIGNIN } from "../routes/RouteConstants";
const Header = ({ toggleDrawer }) => {
    const navigate = useNavigate();
    const handleMenuClick = (e) => {
        if (e.key === "profile") {
            navigate("/dashboard/profile");
        }
        else if (e.key === "logout") {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            navigate(SIGNIN);
        }
    };
    const menu = (_jsxs(Menu, { onClick: handleMenuClick, children: [_jsx(Menu.Item, { children: "Profile" }, "profile"), _jsx(Menu.Item, { children: "Logout" }, "logout")] }));
    return (_jsxs(Row, { justify: "space-between", align: "middle", className: "bg-slate-100 shadow-sm border-gray-200 p-[18px]", children: [_jsx(Col, { children: _jsx(Button, { type: "text", icon: _jsx(MenuOutlined, {}), onClick: toggleDrawer }) }), _jsx(Col, { children: _jsx(Dropdown, { overlay: menu, trigger: ["click"], children: _jsx(Avatar, { src: "https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg", icon: _jsx(UserOutlined, {}), style: { cursor: "pointer" } }) }) })] }));
};
export default Header;
