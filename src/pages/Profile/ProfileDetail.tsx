import React, { useEffect } from "react"
import { Form, Input, Button, Switch, Select } from "antd"
import { getProfile, updateProfile } from "../../api/profile"
import Title from "antd/es/typography/Title"

const { Option } = Select

const ProfileDetail: React.FC = () => {
  const [form] = Form.useForm()

  /* 
  API 
  */
  const fetchProfile = async () => {
    const profileData = await getProfile()
    form.setFieldsValue(profileData)
  }

  /* 
  Effects 
  */
  useEffect(() => {
    fetchProfile()
  }, [form])

  /* 
  Handlers 
  */
  const onFinish = async (values: any) => {
    await updateProfile(values)
    fetchProfile()
  }

  return (
    <div className="p-4 md:p-8 lg:p-12">
      <Title level={2} className="text-center">
        Profile Details
      </Title>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ is_active: true }}
        className="w-full lg:w-3/4 mx-auto"
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Role"
          name="role"
          rules={[{ required: true, message: "Please select your role!" }]}
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
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ProfileDetail
