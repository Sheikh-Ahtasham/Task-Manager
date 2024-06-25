import React, { useEffect } from "react"
import { Form, Input, Button, Select, Switch } from "antd"
import { getUsers, updateUser } from "../../api/user"

import { useParams, useNavigate } from "react-router-dom"

const { Option } = Select

const EditUser: React.FC = () => {
  const { id } = useParams<{ id?: string }>()

  const [form] = Form.useForm()
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const fetchUsers = async () => {
        try {
          const users = await getUsers()
          const targetUser = users?.data?.find(
            (user: any) => user.id === Number(id),
          )
          form.setFieldsValue(targetUser)
        } catch (error) {
          console.error("Failed to fetch user data:", error)
        }
      }
      fetchUsers()
    }
  }, [id, form])

  const onFinish = async (values: any) => {
    if (id) {
      try {
        await updateUser(id, values)
        navigate("/dashboard/users")
      } catch (error) {
        console.error("Failed to update user:", error)
      }
    }
  }

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="w-full lg:w-3/4 mx-auto"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input the name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input the email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input the password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select the role!" }]}
        >
          <Select>
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Active Status"
          name="is_active"
          valuePropName="checked"
        >
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update User
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default EditUser
