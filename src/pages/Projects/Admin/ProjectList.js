import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Table, Button, Space, Tag, Modal, Select } from "antd";
import { Link } from "react-router-dom";
import { getProjects, deleteProject, assignProject } from "../../../api/project";
import { MenuOutlined, DeleteOutlined, EditFilled, UsergroupAddOutlined, } from "@ant-design/icons";
import { DateTime } from "luxon";
import { getUsers } from "../../../api/user";
const ProjectList = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const fetchProjects = async (page = 1, pageSize) => {
        setLoading(true);
        try {
            const data = await getProjects(page, pageSize);
            setProjects(data.data);
            setPagination({
                current: data.current_page,
                pageSize: data.per_page,
                total: data.total,
            });
        }
        catch (error) {
            console.error("There was an error fetching the projects!", error);
        }
        finally {
            setLoading(false);
        }
    };
    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data.data);
        }
        catch (error) {
            console.error("There was an error fetching the users!", error);
        }
    };
    useEffect(() => {
        fetchProjects(pagination.current, pagination.pageSize);
        fetchUsers();
    }, []);
    const handleDelete = async (id) => {
        try {
            await deleteProject(id);
            setProjects(projects?.filter((project) => project?.id !== id));
        }
        catch (error) {
            console.error("There was an error deleting the project!", error);
        }
    };
    const handleAssignUsers = async () => {
        if (selectedProjectId !== null) {
            try {
                await assignProject(selectedProjectId, selectedUsers);
                setIsModalVisible(false);
                setSelectedUsers([]);
            }
            catch (error) {
                console.error("There was an error assigning users to the project!", error);
            }
        }
    };
    const handleTableChange = (pagination) => {
        fetchProjects(pagination.current, pagination.pageSize);
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
            width: 300,
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
            width: 300,
        },
        {
            title: "Status",
            dataIndex: "is_active",
            key: "is_active",
            render: (isActive) => isActive ? (_jsx(Tag, { color: "success", children: "Active" })) : (_jsx(Tag, { color: "warning", children: "Inactive" })),
        },
        {
            title: "Created At",
            dataIndex: "created_at",
            key: "created_at",
            render: (created_at) => DateTime.fromISO(created_at).toFormat("dd/MM/yyyy, h:mm a"),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (_jsxs(Space, { size: "small", children: [_jsx(Link, { to: `/dashboard/admin/projects/${record.id}/tasks`, children: _jsx(Button, { type: "text", icon: _jsx(MenuOutlined, {}) }) }), _jsx(Button, { type: "text", icon: _jsx(UsergroupAddOutlined, {}), onClick: () => {
                            setSelectedProjectId(record.id);
                            setIsModalVisible(true);
                        } }), _jsx(Link, { to: `/dashboard/admin/projects/edit/${record.id}`, children: _jsx(Button, { type: "text", icon: _jsx(EditFilled, {}) }) }), _jsx(Button, { type: "text", danger: true, icon: _jsx(DeleteOutlined, {}), onClick: () => handleDelete(record.id) })] })),
        },
    ];
    return (_jsxs("div", { className: "p-4 md:p-8 lg:p-12", children: [_jsx("div", { className: "flex justify-end mb-4", children: _jsx(Link, { to: "/dashboard/admin/projects/create", children: _jsx(Button, { type: "primary", children: "Create Project" }) }) }), _jsx(Table, { columns: columns, dataSource: projects, loading: loading, pagination: pagination, onChange: handleTableChange, scroll: { x: "min-content" }, rowKey: "id" }), _jsx(Modal, { title: "Assign Users to Project", visible: isModalVisible, onOk: handleAssignUsers, onCancel: () => setIsModalVisible(false), children: _jsx(Select, { mode: "multiple", allowClear: true, style: { width: "100%" }, placeholder: "Please select users", onChange: setSelectedUsers, options: users?.map((user) => ({
                        label: user?.name,
                        value: user?.id,
                    })) }) })] }));
};
export default ProjectList;
