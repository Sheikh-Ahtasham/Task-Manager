import { useEffect, useState } from "react"
import { Table, Button, Space, Tag, Modal, Select } from "antd"
import { Link } from "react-router-dom"
import { getProjects, deleteProject, assignProject } from "../../../api/project"
import {
  MenuOutlined,
  DeleteOutlined,
  EditFilled,
  UsergroupAddOutlined,
} from "@ant-design/icons"
import { DateTime } from "luxon"
import { getUsers } from "../../../api/user"

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [selectedProjectId, setSelectedProjectId] = useState<number | null>(
    null,
  )
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const fetchProjects = async (page = 1, pageSize: number) => {
    setLoading(true)
    try {
      const data = await getProjects(page, pageSize)
      setProjects(data.data)
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

  const fetchUsers = async () => {
    try {
      const data = await getUsers()
      setUsers(data.data)
    } catch (error) {
      console.error("There was an error fetching the users!", error)
    }
  }

  useEffect(() => {
    fetchProjects(pagination.current, pagination.pageSize)
    fetchUsers()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id)
      setProjects(projects?.filter((project: any) => project?.id !== id))
    } catch (error) {
      console.error("There was an error deleting the project!", error)
    }
  }

  const handleAssignUsers = async () => {
    if (selectedProjectId !== null) {
      try {
        await assignProject(selectedProjectId, selectedUsers)
        setIsModalVisible(false)
        setSelectedUsers([])
      } catch (error) {
        console.error(
          "There was an error assigning users to the project!",
          error,
        )
      }
    }
  }

  const handleTableChange = (pagination: any) => {
    fetchProjects(pagination.current, pagination.pageSize)
  }

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
      render: (isActive: number) =>
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
        <Space size="small">
          <Link to={`/dashboard/admin/projects/${record.id}/tasks`}>
            <Button type="text" icon={<MenuOutlined />} />
          </Link>
          <Button
            type="text"
            icon={<UsergroupAddOutlined />}
            onClick={() => {
              setSelectedProjectId(record.id)
              setIsModalVisible(true)
            }}
          />

          <Link to={`/dashboard/admin/projects/edit/${record.id}`}>
            <Button type="text" icon={<EditFilled />} />
          </Link>

          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ]

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <div className="flex justify-end mb-4">
        <Link to="/dashboard/admin/projects/create">
          <Button type="primary">Create Project</Button>
        </Link>
      </div>
      <Table
        columns={columns}
        dataSource={projects}
        loading={loading}
        pagination={pagination}
        onChange={handleTableChange}
        scroll={{ x: "min-content" }}
        rowKey="id"
      />
      <Modal
        title="Assign Users to Project"
        visible={isModalVisible}
        onOk={handleAssignUsers}
        onCancel={() => setIsModalVisible(false)}
      >
        <Select
          mode="multiple"
          allowClear
          style={{ width: "100%" }}
          placeholder="Please select users"
          onChange={setSelectedUsers}
          options={users?.map((user: any) => ({
            label: user?.name,
            value: user?.id,
          }))}
        />
      </Modal>
    </div>
  )
}

export default ProjectList
