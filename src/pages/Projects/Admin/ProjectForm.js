import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import { Form, Input, Button, Switch } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getProjects, createProject, updateProject } from "../../../api/project";
const ProjectForm = ({ isEdit = false }) => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        if (isEdit) {
            const fetchProjects = async () => {
                try {
                    const projects = await getProjects();
                    const project = projects.data.find((project) => project.id === Number(id));
                    if (project) {
                        form.setFieldsValue(project);
                    }
                    else {
                        console.error("Project not found!");
                    }
                }
                catch (error) {
                    console.error("There was an error fetching the projects!", error);
                }
            };
            fetchProjects();
        }
    }, [id, form, isEdit]);
    const onFinish = async (values) => {
        try {
            if (isEdit) {
                id && (await updateProject(id, values));
            }
            else {
                await createProject(values);
            }
            navigate("/dashboard/admin/projects");
        }
        catch (error) {
            console.error("There was an error submitting the form!", error);
        }
    };
    return (_jsx("div", { className: "p-4", children: _jsxs(Form, { form: form, layout: "vertical", onFinish: onFinish, className: "p-4 bg-white shadow-md rounded-md", children: [_jsx(Form.Item, { label: "Project Name", name: "name", rules: [
                        { required: true, message: "Please input the project name!" },
                    ], children: _jsx(Input, { className: "w-full p-2 border rounded-md" }) }), _jsx(Form.Item, { label: "Description", name: "description", rules: [{ required: true, message: "Please input the description!" }], children: _jsx(Input.TextArea, { className: "w-full p-2 border rounded-md" }) }), _jsx(Form.Item, { label: "Active Status", name: "is_active", valuePropName: "checked", children: _jsx(Switch, { defaultChecked: true }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", className: "w-full bg-blue-500 text-white", children: "Submit" }) })] }) }));
};
export default ProjectForm;
