import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Layout, Button, Typography, Form, Input } from "antd";
import { SIGNIN } from "../../routes/RouteConstants";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../../api/accounts";
const { Title } = Typography;
const { Content } = Layout;
const SignUp = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const response = await signUp(values);
        navigate(SIGNIN);
    };
    return (_jsx(Content, { className: "h-screen flex justify-center items-center", children: _jsxs("div", { className: "w-full max-w-md p-6 bg-white shadow-md rounded-md", children: [_jsx(Title, { className: "mb-4", children: "Sign Up" }), _jsx("p", { className: "text-lg text-gray-600 mb-6", children: "Use these awesome forms to create a new account in your project for free." }), _jsxs(Form, { name: "SignUp", form: form, onFinish: onFinish, initialValues: { remember: true }, layout: "vertical", className: "row-col", children: [_jsx(Form.Item, { name: "name", label: "Name", rules: [{ required: true, message: "Please input your name!" }], children: _jsx(Input, { placeholder: "Name" }) }), _jsx(Form.Item, { name: "email", label: "Email", rules: [{ required: true, message: "Please input your email!" }], children: _jsx(Input, { placeholder: "Email" }) }), _jsx(Form.Item, { name: "password", label: "Password", rules: [{ required: true, message: "Please input your password!" }], children: _jsx(Input, { type: "password", placeholder: "Password" }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", className: "w-full", children: "Sign Up" }) })] }), _jsxs("p", { className: "font-semibold text-center text-gray-600", children: ["Already have an account?", _jsx("span", { className: "font-bold text-blue-600 cursor-pointer", children: _jsx(Link, { to: SIGNIN, children: "Sign In" }) })] })] }) }));
};
export default SignUp;
