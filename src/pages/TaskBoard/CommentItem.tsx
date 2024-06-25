import React, { useState } from "react"
import { Button, Input, Space, List } from "antd"
import { EditOutlined, DeleteOutlined } from "@ant-design/icons"

const { TextArea } = Input

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

interface CommentItemProps {
  comment: Comment
  onUpdateComment: (commentId: number, updatedText: string | null) => void
  onDeleteComment: (commentId: number) => void
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onUpdateComment,
  onDeleteComment,
}) => {
  const [isEditing, setIsEditing] = useState(false)
  const [updatedContent, setUpdatedContent] = useState(comment.content)

  const handleUpdate = () => {
    onUpdateComment(comment.id, updatedContent)
    setIsEditing(false)
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center">
        <span className="font-bold">User {comment.user_id}</span>
        <span className="text-xs text-gray-500">{comment.created_at}</span>
      </div>
      {isEditing ? (
        <div className="mt-2">
          <TextArea
            value={updatedContent}
            onChange={e => setUpdatedContent(e.target.value)}
          />
          <Space className="mt-2">
            <Button type="primary" onClick={handleUpdate}>
              Save
            </Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </Space>
        </div>
      ) : (
        <p className="mt-2">{comment.content}</p>
      )}
      <div className="flex space-x-2 mt-2">
        <Button icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
          Edit
        </Button>
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={() => onDeleteComment(comment.id)}
        >
          Delete
        </Button>
      </div>

      {comment?.replies?.map(reply => (
        <div key={reply.id} className="ml-4 mt-4">
          <CommentItem
            comment={reply}
            onUpdateComment={onUpdateComment}
            onDeleteComment={onDeleteComment}
          />
        </div>
      ))}
    </div>
  )
}

export default CommentItem
