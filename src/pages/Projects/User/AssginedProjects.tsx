import { useEffect, useState } from "react"
import { Button, Table, Tag } from "antd"
import { getAssignedProjects } from "../../../api/project"
import { DateTime } from "luxon"
import { MenuOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

const AssignedProjects: React.FC = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  })

  const fetchAssignedProjects = async (page = 1, pageSize: number) => {
    setLoading(true)
    try {
      const data = await getAssignedProjects(page, pageSize)
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

  useEffect(() => {
    fetchAssignedProjects(pagination.current, pagination.pageSize)
  }, [])

  const handleTableChange = (pagination: any) => {
    fetchAssignedProjects(pagination.current, pagination.pageSize)
  }

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
        <Link to={`/dashboard/user/projects/${record.id}/tasks`}>
          <Button type="text" icon={<MenuOutlined />} />
        </Link>
      ),
    },
  ]

  return (
    <>
      <div className="p-4 md:p-8 lg:p-12">
        <Table
          columns={columns}
          dataSource={projects}
          loading={loading}
          pagination={pagination}
          onChange={handleTableChange}
          rowKey="id"
        />
      </div>
    </>
  )
}

export default AssignedProjects
