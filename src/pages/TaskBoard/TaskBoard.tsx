import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd"
import { Modal, Button, Tag, Space, Input, Form, List, Spin } from "antd"
import {
  getTasksByProject,
  updateTask,
  getTaskById,
  addComment,
  updateComment,
  deleteComment,
  getComments,
} from "../../api/task"
import Title from "antd/es/typography/Title"
import CommentItem from "./CommentItem"

const { TextArea } = Input

interface Task {
  id: number
  title: string
  description: string
  status: string
  priority: string
  name: string
  due_date: string
  subtasks: Array<{ id: number; name: string }>
  comments: Array<{ id: number; content: string }>
}

interface Comment {
  id: number
  parent_id: number | null
  user_id: number
  task_id: number
  content: string
  created_at: string
  updated_at: string
  replies: Comment[]
}

const TaskBoard: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>()
  const [tasks, setTasks] = useState<Task[]>([])
  const [columns, setColumns] = useState<{ [key: string]: Task[] }>({
    todo: [],
    inProgress: [],
    testing: [],
    hold: [],
    completed: [],
  })
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [loading, setLoading] = useState(true)

  const fetchTasks = async () => {
    try {
      const data = await getTasksByProject(Number(projectId))
      setTasks(data)
      setColumns({
        todo: data.filter((task: Task) => task.status === "todo"),
        inProgress: data.filter((task: Task) => task.status === "in-progress"),
        testing: data.filter((task: Task) => task.status === "testing"),
        hold: data.filter((task: Task) => task.status === "hold"),
        completed: data.filter((task: Task) => task.status === "completed"),
      })
    } catch (error) {
      console.error("There was an error fetching the tasks!", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [projectId])

  // Handle drag end
  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result

    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return
    }

    const draggedTask = columns[source.droppableId][source.index]

    const newSourceColumn = Array.from(columns[source.droppableId])
    newSourceColumn.splice(source.index, 1)

    const newDestinationColumn = Array.from(columns[destination.droppableId])
    newDestinationColumn.splice(destination.index, 0, draggedTask)

    if (source.droppableId !== destination.droppableId) {
      draggedTask.status = destination.droppableId
    }

    setColumns({
      ...columns,
      [source.droppableId]: newSourceColumn,
      [destination.droppableId]: newDestinationColumn,
    })

    try {
      await updateTask(Number(projectId), draggedTask.id, {
        name: draggedTask.name,
        descriptions: draggedTask.description,
        due_date: draggedTask.due_date,
        status: destination.droppableId,
      })
    } catch (error) {
      console.error("There was an error updating the task status!", error)
    }
  }

  if (loading) {
    return <Spin size="large" />
  }

  const handleTaskClick = async (taskId: number) => {
    try {
      const taskData = await getTaskById(Number(projectId), taskId)
      setSelectedTask(taskData)
      const commentsData = await getComments(Number(projectId), taskId)
      setComments(commentsData)
      setIsModalVisible(true)
    } catch (error) {
      console.error("There was an error fetching the task details!", error)
    }
  }

  const handleAddComment = async (parent_id: number | null) => {
    if (!selectedTask) return
    try {
      const commentData = await addComment(
        Number(projectId),
        selectedTask.id,
        parent_id,
        newComment,
      )

      if (parent_id) {
        setComments(
          comments.map(comment =>
            comment.id === parent_id
              ? { ...comment, replies: [...comment.replies, commentData] }
              : comment,
          ),
        )
      } else {
        setComments([...comments, commentData])
      }
      setNewComment("")

      const updatedComments = await getComments(
        Number(projectId),
        selectedTask.id,
      )
      setComments(updatedComments)
    } catch (error) {
      console.error("There was an error adding the comment!", error)
    }
  }

  const handleUpdateComment = async (
    commentId: number,
    updatedText: string | null,
  ) => {
    if (!selectedTask || updatedText === null) return
    try {
      const updatedComment = await updateComment(
        Number(projectId),
        selectedTask.id,
        commentId,
        updatedText,
      )
      setComments(
        comments.map(comment =>
          comment.id === commentId ? updatedComment : comment,
        ),
      )

      const updatedComments = await getComments(
        Number(projectId),
        selectedTask.id,
      )
      setComments(updatedComments)
    } catch (error) {
      console.error("There was an error updating the comment!", error)
    }
  }

  const handleDeleteComment = async (commentId: number) => {
    if (!selectedTask) return
    try {
      await deleteComment(Number(projectId), selectedTask.id, commentId)
      setComments(comments.filter(comment => comment.id !== commentId))

      const updatedComments = await getComments(
        Number(projectId),
        selectedTask.id,
      )
      setComments(updatedComments)
    } catch (error) {
      console.error("There was an error deleting the comment!", error)
    }
  }

  return (
    <div className="flex flex-col p-5 bg-slate-200">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex space-x-5">
          {Object.entries(columns).map(([status]) => (
            <Droppable droppableId={status} key={status}>
              {provided => (
                <div
                  className="bg-gray-100 rounded p-3 min-w-[200px] max-w-[300px] flex-1"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <h2 className="text-lg font-semibold mb-3">{status}</h2>
                  {columns[status].map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id.toString()}
                      index={index}
                    >
                      {provided => (
                        <div
                          className="bg-white p-3 mb-3 rounded shadow cursor-pointer"
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                          onClick={() => {
                            handleTaskClick(task.id)
                          }}
                        >
                          <h3 className="font-semibold">{task.title}</h3>
                          <p className="text-sm">{task.description}</p>
                          <Tag
                            color={task.priority === "high" ? "red" : "blue"}
                          >
                            {task.priority}
                          </Tag>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
      {selectedTask && (
        <Modal
          title={selectedTask.name}
          visible={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          width={"800px"}
        >
          <Title level={5}>Description</Title>
          <p className="mb-4">{selectedTask.description}</p>
          {selectedTask.subtasks.length !== 0 && (
            <>
              <Title level={5}>Subtasks</Title>
              <List
                bordered
                style={{ marginBottom: "24px" }}
                dataSource={selectedTask.subtasks}
                renderItem={subtasks => (
                  <List.Item>
                    <span>{subtasks.name}</span>
                  </List.Item>
                )}
              />
            </>
          )}
          <Title level={5}>Comments</Title>
          <List
            dataSource={comments}
            renderItem={comment => (
              <CommentItem
                key={comment.id}
                comment={comment}
                onUpdateComment={handleUpdateComment}
                onDeleteComment={handleDeleteComment}
              />
            )}
          />
          <div className="mt-4">
            <TextArea
              rows={2}
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              placeholder="Add a comment"
            />
            <Button
              type="primary"
              onClick={() => handleAddComment(null)}
              className="mt-2"
            >
              Add Comment
            </Button>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default TaskBoard
