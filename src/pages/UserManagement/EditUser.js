import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Form, Input, Button, Select, Switch } from "antd";
import { getUsers, updateUser } from "../../api/user";
import { useParams, useNavigate } from "react-router-dom";
const { Option } = Select;
const EditUser = () => {
    const { id } = useParams();
    const [form] = Form.useForm();
    const navigate = useNavigate();
    useEffect(() => {
        if (id) {
            const fetchUsers = async () => {
                try {
                    const users = await getUsers();
                    const targetUser = users?.data?.find((user) => user.id === Number(id));
                    form.setFieldsValue(targetUser);
                }
                catch (error) {
                    console.error("Failed to fetch user data:", error);
                }
            };
            fetchUsers();
        }
    }, [id, form]);
    const onFinish = async (values) => {
        if (id) {
            try {
                await updateUser(id, values);
                navigate("/dashboard/users");
            }
            catch (error) {
                console.error("Failed to update user:", error);
            }
        }
    };
    return (_jsx("div", { className: "p-4 md:p-8 lg:p-12", children: _jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, className: "w-full lg:w-3/4 mx-auto", children: [_jsx(Form.Item, { label: "Name", name: "name", rules: [{ required: true, message: "Please input the name!" }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Email", name: "email", rules: [{ required: true, message: "Please input the email!" }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: "Please input the password!" }], children: _jsx(Input.Password, {}) }), _jsx(Form.Item, { label: "Role", name: "role", rules: [{ required: true, message: "Please select the role!" }], children: _jsxs(Select, { children: [_jsx(Option, { value: "admin", children: "Admin" }), _jsx(Option, { value: "user", children: "User" })] }) }), _jsx(Form.Item, { label: "Active Status", name: "is_active", valuePropName: "checked", children: _jsx(Switch, { defaultChecked: true }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", children: "Update User" }) })] }) }));
};
export default EditUser;
