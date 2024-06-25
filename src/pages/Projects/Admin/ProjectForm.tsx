import { useEffect } from "react"
import { Form, Input, Button, Switch } from "antd"
import { useNavigate, useParams } from "react-router-dom"
import { getProjects, createProject, updateProject } from "../../../api/project"

interface IProjectFormProps {
  isEdit?: boolean
}

const ProjectForm: React.FC<IProjectFormProps> = ({ isEdit = false }) => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  useEffect(() => {
    if (isEdit) {
      const fetchProjects = async () => {
        try {
          const projects = await getProjects()
          const project = projects.data.find(
            (project: any) => project.id === Number(id),
          )
          if (project) {
            form.setFieldsValue(project)
          } else {
            console.error("Project not found!")
          }
        } catch (error) {
          console.error("There was an error fetching the projects!", error)
        }
      }
      fetchProjects()
    }
  }, [id, form, isEdit])

  const onFinish = async (values: any) => {
    try {
      if (isEdit) {
        id && (await updateProject(id, values))
      } else {
        await createProject(values)
      }
      navigate("/dashboard/admin/projects")
    } catch (error) {
      console.error("There was an error submitting the form!", error)
    }
  }

  return (
    <div className="p-4">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        className="p-4 bg-white shadow-md rounded-md"
      >
        <Form.Item
          label="Project Name"
          name="name"
          rules={[
            { required: true, message: "Please input the project name!" },
          ]}
        >
          <Input className="w-full p-2 border rounded-md" />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true, message: "Please input the description!" }]}
        >
          <Input.TextArea className="w-full p-2 border rounded-md" />
        </Form.Item>
        <Form.Item
          label="Active Status"
          name="is_active"
          valuePropName="checked"
        >
          <Switch defaultChecked />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full bg-blue-500 text-white"
          >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default ProjectForm
