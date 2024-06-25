import React from "react"
import { Layout, Button, Typography, Form, Input } from "antd"
import { SIGNIN } from "../../routes/RouteConstants"
import { Link, useNavigate } from "react-router-dom"
import { signUp } from "../../api/accounts"

const { Title } = Typography
const { Content } = Layout

const SignUp: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    const response = await signUp(values)
    navigate(SIGNIN)
  }

  return (
    <Content className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <Title className="mb-4">Sign Up</Title>
        <p className="text-lg text-gray-600 mb-6">
          Use these awesome forms to create a new account in your project for
          free.
        </p>

        <Form
          name="SignUp"
          form={form}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
          className="row-col"
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input placeholder="Name" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Sign Up
            </Button>
          </Form.Item>
        </Form>
        <p className="font-semibold text-center text-gray-600">
          Already have an account?
          <span className="font-bold text-blue-600 cursor-pointer">
            <Link to={SIGNIN}>Sign In</Link>
          </span>
        </p>
      </div>
    </Content>
  )
}

export default SignUp
