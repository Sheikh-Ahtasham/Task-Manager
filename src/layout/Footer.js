import { jsx as _jsx } from "react/jsx-runtime";
import { Layout, Row, Col } from "antd";
const { Footer: AntFooter } = Layout;
const Footer = () => {
    return (_jsx(AntFooter, { className: "bg-slate-100 border-t border-gray-200 p-[18px]", children: _jsx(Row, { justify: "center", align: "middle", children: _jsx(Col, { children: _jsx("div", { className: "text-center", children: _jsx("span", { className: "block mb-2", children: "\u00A9 2024, made by Ahtasham Athar." }) }) }) }) }));
};
export default Footer;
