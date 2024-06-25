import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout, Drawer, Affix } from "antd";
import Sidenav from "./Sidenav";
import Header from "./Header";
import Footer from "./Footer";
const { Content, Sider } = Layout;
const Main = () => {
    const [visible, setVisible] = useState(true);
    const toggleDrawer = () => setVisible(!visible);
    return (_jsxs(Layout, { className: "min-h-screen", children: [_jsx(Drawer, { placement: "left", closable: false, onClose: () => setVisible(false), visible: visible && window.innerWidth < 1024, width: 250, bodyStyle: { padding: 0 }, children: _jsx(Sidenav, {}) }), _jsx(Sider, { trigger: null, collapsedWidth: "0", breakpoint: "lg", onBreakpoint: broken => {
                    if (broken)
                        setVisible(false);
                }, collapsible: true, collapsed: !visible, width: 250, theme: "light", className: `overflow-y-auto lg:block`, children: _jsx(Sidenav, {}) }), _jsxs(Layout, { className: `transition-all duration-300 `, children: [_jsx(Affix, { offsetTop: 0, children: _jsx(Header, { toggleDrawer: toggleDrawer }) }), _jsx(Content, { className: "p-6", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] })] }));
};
export default Main;
