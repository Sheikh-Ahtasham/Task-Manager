import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DragDropContext, Droppable, Draggable, } from "react-beautiful-dnd";
import { Modal, Button, Tag, Input, List, Spin } from "antd";
import { getTasksByProject, updateTask, getTaskById, addComment, updateComment, deleteComment, getComments, } from "../../api/task";
import Title from "antd/es/typography/Title";
import CommentItem from "./CommentItem";
const { TextArea } = Input;
const TaskBoard = () => {
    const { projectId } = useParams();
    const [tasks, setTasks] = useState([]);
    const [columns, setColumns] = useState({
        todo: [],
        inProgress: [],
        testing: [],
        hold: [],
        completed: [],
    });
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(true);
    const fetchTasks = async () => {
        try {
            const data = await getTasksByProject(Number(projectId));
            setTasks(data);
            setColumns({
                todo: data.filter((task) => task.status === "todo"),
                inProgress: data.filter((task) => task.status === "in-progress"),
                testing: data.filter((task) => task.status === "testing"),
                hold: data.filter((task) => task.status === "hold"),
                completed: data.filter((task) => task.status === "completed"),
            });
        }
        catch (error) {
            console.error("There was an error fetching the tasks!", error);
        }
        finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchTasks();
    }, [projectId]);
    // Handle drag end
    const onDragEnd = async (result) => {
        const { source, destination } = result;
        if (!destination)
            return;
        if (source.droppableId === destination.droppableId &&
            source.index === destination.index) {
            return;
        }
        const draggedTask = columns[source.droppableId][source.index];
        const newSourceColumn = Array.from(columns[source.droppableId]);
        newSourceColumn.splice(source.index, 1);
        const newDestinationColumn = Array.from(columns[destination.droppableId]);
        newDestinationColumn.splice(destination.index, 0, draggedTask);
        if (source.droppableId !== destination.droppableId) {
            draggedTask.status = destination.droppableId;
        }
        setColumns({
            ...columns,
            [source.droppableId]: newSourceColumn,
            [destination.droppableId]: newDestinationColumn,
        });
        try {
            await updateTask(Number(projectId), draggedTask.id, {
                name: draggedTask.name,
                descriptions: draggedTask.description,
                due_date: draggedTask.due_date,
                status: destination.droppableId,
            });
        }
        catch (error) {
            console.error("There was an error updating the task status!", error);
        }
    };
    if (loading) {
        return _jsx(Spin, { size: "large" });
    }
    const handleTaskClick = async (taskId) => {
        try {
            const taskData = await getTaskById(Number(projectId), taskId);
            setSelectedTask(taskData);
            const commentsData = await getComments(Number(projectId), taskId);
            setComments(commentsData);
            setIsModalVisible(true);
        }
        catch (error) {
            console.error("There was an error fetching the task details!", error);
        }
    };
    const handleAddComment = async (parent_id) => {
        if (!selectedTask)
            return;
        try {
            const commentData = await addComment(Number(projectId), selectedTask.id, parent_id, newComment);
            if (parent_id) {
                setComments(comments.map(comment => comment.id === parent_id
                    ? { ...comment, replies: [...comment.replies, commentData] }
                    : comment));
            }
            else {
                setComments([...comments, commentData]);
            }
            setNewComment("");
            const updatedComments = await getComments(Number(projectId), selectedTask.id);
            setComments(updatedComments);
        }
        catch (error) {
            console.error("There was an error adding the comment!", error);
        }
    };
    const handleUpdateComment = async (commentId, updatedText) => {
        if (!selectedTask || updatedText === null)
            return;
        try {
            const updatedComment = await updateComment(Number(projectId), selectedTask.id, commentId, updatedText);
            setComments(comments.map(comment => comment.id === commentId ? updatedComment : comment));
            const updatedComments = await getComments(Number(projectId), selectedTask.id);
            setComments(updatedComments);
        }
        catch (error) {
            console.error("There was an error updating the comment!", error);
        }
    };
    const handleDeleteComment = async (commentId) => {
        if (!selectedTask)
            return;
        try {
            await deleteComment(Number(projectId), selectedTask.id, commentId);
            setComments(comments.filter(comment => comment.id !== commentId));
            const updatedComments = await getComments(Number(projectId), selectedTask.id);
            setComments(updatedComments);
        }
        catch (error) {
            console.error("There was an error deleting the comment!", error);
        }
    };
    return (_jsxs("div", { className: "flex flex-col p-5 bg-slate-200", children: [_jsx(DragDropContext, { onDragEnd: onDragEnd, children: _jsx("div", { className: "flex space-x-5", children: Object.entries(columns).map(([status]) => (_jsx(Droppable, { droppableId: status, children: provided => (_jsxs("div", { className: "bg-gray-100 rounded p-3 min-w-[200px] max-w-[300px] flex-1", ...provided.droppableProps, ref: provided.innerRef, children: [_jsx("h2", { className: "text-lg font-semibold mb-3", children: status }), columns[status].map((task, index) => (_jsx(Draggable, { draggableId: task.id.toString(), index: index, children: provided => (_jsxs("div", { className: "bg-white p-3 mb-3 rounded shadow cursor-pointer", ...provided.draggableProps, ...provided.dragHandleProps, ref: provided.innerRef, onClick: () => {
                                            handleTaskClick(task.id);
                                        }, children: [_jsx("h3", { className: "font-semibold", children: task.title }), _jsx("p", { className: "text-sm", children: task.description }), _jsx(Tag, { color: task.priority === "high" ? "red" : "blue", children: task.priority })] })) }, task.id))), provided.placeholder] })) }, status))) }) }), selectedTask && (_jsxs(Modal, { title: selectedTask.name, visible: isModalVisible, onCancel: () => setIsModalVisible(false), footer: null, width: "800px", children: [_jsx(Title, { level: 5, children: "Description" }), _jsx("p", { className: "mb-4", children: selectedTask.description }), selectedTask.subtasks.length !== 0 && (_jsxs(_Fragment, { children: [_jsx(Title, { level: 5, children: "Subtasks" }), _jsx(List, { bordered: true, style: { marginBottom: "24px" }, dataSource: selectedTask.subtasks, renderItem: subtasks => (_jsx(List.Item, { children: _jsx("span", { children: subtasks.name }) })) })] })), _jsx(Title, { level: 5, children: "Comments" }), _jsx(List, { dataSource: comments, renderItem: comment => (_jsx(CommentItem, { comment: comment, onUpdateComment: handleUpdateComment, onDeleteComment: handleDeleteComment }, comment.id)) }), _jsxs("div", { className: "mt-4", children: [_jsx(TextArea, { rows: 2, value: newComment, onChange: e => setNewComment(e.target.value), placeholder: "Add a comment" }), _jsx(Button, { type: "primary", onClick: () => handleAddComment(null), className: "mt-2", children: "Add Comment" })] })] }))] }));
};
export default TaskBoard;
