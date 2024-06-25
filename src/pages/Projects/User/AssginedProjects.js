import { jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Button, Table, Tag } from "antd";
import { getAssignedProjects } from "../../../api/project";
import { DateTime } from "luxon";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const AssignedProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        current: 1,
        pageSize: 10,
        total: 0,
    });
    const fetchAssignedProjects = async (page = 1, pageSize) => {
        setLoading(true);
        try {
            const data = await getAssignedProjects(page, pageSize);
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
    useEffect(() => {
        fetchAssignedProjects(pagination.current, pagination.pageSize);
    }, []);
    const handleTableChange = (pagination) => {
        fetchAssignedProjects(pagination.current, pagination.pageSize);
    };
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",
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
            render: (text, record) => (_jsx(Link, { to: `/dashboard/user/projects/${record.id}/tasks`, children: _jsx(Button, { type: "text", icon: _jsx(MenuOutlined, {}) }) })),
        },
    ];
    return (_jsx(_Fragment, { children: _jsx("div", { className: "p-4 md:p-8 lg:p-12", children: _jsx(Table, { columns: columns, dataSource: projects, loading: loading, pagination: pagination, onChange: handleTableChange, rowKey: "id" }) }) }));
};
export default AssignedProjects;
