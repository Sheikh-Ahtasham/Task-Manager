import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from "react";
import { Button, Input, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
const { TextArea } = Input;
const CommentItem = ({ comment, onUpdateComment, onDeleteComment, }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updatedContent, setUpdatedContent] = useState(comment.content);
    const handleUpdate = () => {
        onUpdateComment(comment.id, updatedContent);
        setIsEditing(false);
    };
    return (_jsxs("div", { className: "p-4 bg-white rounded-lg shadow-md mb-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("span", { className: "font-bold", children: ["User ", comment.user_id] }), _jsx("span", { className: "text-xs text-gray-500", children: comment.created_at })] }), isEditing ? (_jsxs("div", { className: "mt-2", children: [_jsx(TextArea, { value: updatedContent, onChange: e => setUpdatedContent(e.target.value) }), _jsxs(Space, { className: "mt-2", children: [_jsx(Button, { type: "primary", onClick: handleUpdate, children: "Save" }), _jsx(Button, { onClick: () => setIsEditing(false), children: "Cancel" })] })] })) : (_jsx("p", { className: "mt-2", children: comment.content })), _jsxs("div", { className: "flex space-x-2 mt-2", children: [_jsx(Button, { icon: _jsx(EditOutlined, {}), onClick: () => setIsEditing(true), children: "Edit" }), _jsx(Button, { icon: _jsx(DeleteOutlined, {}), danger: true, onClick: () => onDeleteComment(comment.id), children: "Delete" })] }), comment?.replies?.map(reply => (_jsx("div", { className: "ml-4 mt-4", children: _jsx(CommentItem, { comment: reply, onUpdateComment: onUpdateComment, onDeleteComment: onDeleteComment }) }, reply.id)))] }));
};
export default CommentItem;
