import React from "react"
import { Form, Input, Button, Select, Switch } from "antd"
import { createUser } from "../../api/user"
import { useNavigate } from "react-router-dom"

const { Option } = Select

const CreateUser: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    await createUser(values)
    navigate("/dashboard/users")
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
            Create User
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default CreateUser
