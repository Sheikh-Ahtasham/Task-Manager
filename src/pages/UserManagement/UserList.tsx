import React, { useEffect, useState } from "react"
import { Table, Button, Tag } from "antd"
import { Link } from "react-router-dom"
import { getUsers, deleteUser } from "../../api/user"
import { DateTime } from "luxon"
import { DeleteOutlined, EditFilled } from "@ant-design/icons"

const UserList: React.FC = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const fetchUsers = async (page = 1, pageSize: number) => {
    setLoading(true)
    try {
      const data = await getUsers(page, pageSize)
      setUsers(data.data)

      setPagination({
        current: data.current_page,
        pageSize: data.per_page,
        total: data.total,
      })
    } catch (error) {
      console.error("There was an error fetching the projects!", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchUsers(pagination.current, pagination.pageSize)
  }, [])

  const handleDelete = async (id: number) => {
    await deleteUser(id)
    setUsers(users.filter((user: any) => user.id !== id))
  }

  const handleTableChange = (pagination: any) => {
    fetchUsers(pagination.current, pagination.pageSize)
  }

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
      render: (isActive: boolean) =>
        isActive ? (
          <Tag color="success">Active</Tag>
        ) : (
          <Tag color="warning">Inactive</Tag>
        ),
    },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) =>
        DateTime.fromISO(created_at).toFormat("dd/MM/yyyy, h:mm a"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (text: string, record: any) => (
        <div className="flex space-x-2">
          <Link to={`/dashboard/edit-user/${record.id}`}>
            <Button type="text" icon={<EditFilled />} />
          </Link>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </div>
      ),
    },
  ]

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="flex justify-end mb-4">
        <Link to="/dashboard/create-user">
          <Button type="primary">Create User</Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: "min-content" }}
        rowKey="id"
      />
    </div>
  )
}

export default UserList
