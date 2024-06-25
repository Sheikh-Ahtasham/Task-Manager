import React from "react"
import { Layout, Button, Typography, Form, Input } from "antd"
import { SIGNUP } from "../../routes/RouteConstants"
import { Link, useNavigate } from "react-router-dom"
import { signIn } from "../../api/accounts"

const { Title } = Typography
const { Content } = Layout

const SignIn: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    const response = await signIn(values)
    localStorage.setItem("token", response.data.token)
    localStorage.setItem("user", JSON.stringify(response.data.user))
    navigate("/dashboard")
  }

  return (
    <Content className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md p-6 bg-white shadow-md rounded-md">
        <Title className="mb-4">Sign In</Title>
        <p className="text-lg text-gray-600 mb-6">
          Enter your email and password to sign in.
        </p>

        <Form
          name="SignIn"
          form={form}
          onFinish={onFinish}
          initialValues={{ remember: true }}
          layout="vertical"
          className="row-col"
        >
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
              Sign In
            </Button>
          </Form.Item>
        </Form>
        <p className="font-semibold text-center text-gray-600">
          Don't have an account?
          <span className="font-bold text-blue-600 cursor-pointer">
            <Link to={SIGNUP}>Sign Up</Link>
          </span>
        </p>
      </div>
    </Content>
  )
}

export default SignIn
