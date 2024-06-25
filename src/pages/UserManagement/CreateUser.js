import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form, Input, Button, Select, Switch } from "antd";
import { createUser } from "../../api/user";
import { useNavigate } from "react-router-dom";
const { Option } = Select;
const CreateUser = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        await createUser(values);
        navigate("/dashboard/users");
    };
    return (_jsx("div", { className: "p-4 md:p-8 lg:p-12", children: _jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, className: "w-full lg:w-3/4 mx-auto", children: [_jsx(Form.Item, { label: "Name", name: "name", rules: [{ required: true, message: "Please input the name!" }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Email", name: "email", rules: [{ required: true, message: "Please input the email!" }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: "Please input the password!" }], children: _jsx(Input.Password, {}) }), _jsx(Form.Item, { label: "Role", name: "role", rules: [{ required: true, message: "Please select the role!" }], children: _jsxs(Select, { children: [_jsx(Option, { value: "admin", children: "Admin" }), _jsx(Option, { value: "user", children: "User" })] }) }), _jsx(Form.Item, { label: "Active Status", name: "is_active", valuePropName: "checked", children: _jsx(Switch, { defaultChecked: true }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", children: "Create User" }) })] }) }));
};
export default CreateUser;
