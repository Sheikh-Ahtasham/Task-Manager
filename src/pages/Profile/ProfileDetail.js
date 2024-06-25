import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Form, Input, Button, Switch, Select } from "antd";
import { getProfile, updateProfile } from "../../api/profile";
import Title from "antd/es/typography/Title";
const { Option } = Select;
const ProfileDetail = () => {
    const [form] = Form.useForm();
    /*
    API
    */
    const fetchProfile = async () => {
        const profileData = await getProfile();
        form.setFieldsValue(profileData);
    };
    /*
    Effects
    */
    useEffect(() => {
        fetchProfile();
    }, [form]);
    /*
    Handlers
    */
    const onFinish = async (values) => {
        await updateProfile(values);
        fetchProfile();
    };
    return (_jsxs("div", { className: "p-4 md:p-8 lg:p-12", children: [_jsx(Title, { level: 2, className: "text-center", children: "Profile Details" }), _jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, initialValues: { is_active: true }, className: "w-full lg:w-3/4 mx-auto", children: [_jsx(Form.Item, { label: "Name", name: "name", rules: [{ required: true, message: "Please input your name!" }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Email", name: "email", rules: [{ required: true, message: "Please input your email!" }], children: _jsx(Input, {}) }), _jsx(Form.Item, { label: "Password", name: "password", rules: [{ required: true, message: "Please input your password!" }], children: _jsx(Input.Password, {}) }), _jsx(Form.Item, { label: "Role", name: "role", rules: [{ required: true, message: "Please select your role!" }], children: _jsxs(Select, { children: [_jsx(Option, { value: "admin", children: "Admin" }), _jsx(Option, { value: "user", children: "User" })] }) }), _jsx(Form.Item, { label: "Active Status", name: "is_active", valuePropName: "checked", children: _jsx(Switch, { defaultChecked: true }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", children: "Save" }) })] })] }));
};
export default ProfileDetail;
