import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Table, Button, Tag } from "antd";
import { Link } from "react-router-dom";
import { getUsers, deleteUser } from "../../api/user";
import { DateTime } from "luxon";
import { DeleteOutlined, EditFilled } from "@ant-design/icons";
const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const fetchUsers = async (page = 1, pageSize) => {
        setLoading(true);
        try {
            const data = await getUsers(page, pageSize);
            setUsers(data.data);
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
    useEffect(() => {
        fetchUsers(pagination.current, pagination.pageSize);
    }, []);
    const handleDelete = async (id) => {
        await deleteUser(id);
        setUsers(users.filter((user) => user.id !== id));
    };
    const handleTableChange = (pagination) => {
        fetchUsers(pagination.current, pagination.pageSize);
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
        },
        {
            title: "Role",
            dataIndex: "role",
            key: "role",
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
            render: (text, record) => (_jsxs("div", { className: "flex space-x-2", children: [_jsx(Link, { to: `/dashboard/edit-user/${record.id}`, children: _jsx(Button, { type: "text", icon: _jsx(EditFilled, {}) }) }), _jsx(Button, { type: "text", danger: true, icon: _jsx(DeleteOutlined, {}), onClick: () => handleDelete(record.id) })] })),
        },
    ];
    return (_jsxs("div", { className: "p-4 md:p-8 lg:p-12", children: [_jsx("div", { className: "flex justify-end mb-4", children: _jsx(Link, { to: "/dashboard/create-user", children: _jsx(Button, { type: "primary", children: "Create User" }) }) }), _jsx(Table, { columns: columns, dataSource: users, loading: loading, pagination: pagination, onChange: handleTableChange, scroll: { x: "min-content" }, rowKey: "id" })] }));
};
export default UserList;
