import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Layout, Button, Typography, Form, Input } from "antd";
import { SIGNUP } from "../../routes/RouteConstants";
import { Link, useNavigate } from "react-router-dom";
import { signIn } from "../../api/accounts";
const { Title } = Typography;
const { Content } = Layout;
const SignIn = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const response = await signIn(values);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/dashboard");
    };
    return (_jsx(Content, { className: "h-screen flex justify-center items-center", children: _jsxs("div", { className: "w-full max-w-md p-6 bg-white shadow-md rounded-md", children: [_jsx(Title, { className: "mb-4", children: "Sign In" }), _jsx("p", { className: "text-lg text-gray-600 mb-6", children: "Enter your email and password to sign in." }), _jsxs(Form, { name: "SignIn", form: form, onFinish: onFinish, initialValues: { remember: true }, layout: "vertical", className: "row-col", children: [_jsx(Form.Item, { name: "email", label: "Email", rules: [{ required: true, message: "Please input your email!" }], children: _jsx(Input, { placeholder: "Email" }) }), _jsx(Form.Item, { name: "password", label: "Password", rules: [{ required: true, message: "Please input your password!" }], children: _jsx(Input, { type: "password", placeholder: "Password" }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", className: "w-full", children: "Sign In" }) })] }), _jsxs("p", { className: "font-semibold text-center text-gray-600", children: ["Don't have an account?", _jsx("span", { className: "font-bold text-blue-600 cursor-pointer", children: _jsx(Link, { to: SIGNUP, children: "Sign Up" }) })] })] }) }));
};
export default SignIn;
