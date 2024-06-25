import Api from "./Api";
export const getTasksByProject = async (projectId) => {
    try {
        const response = await Api.get(`v1/project/${projectId}/task`);
        return response.data.data;
    }
    catch (error) {
        console.error("Error fetching tasks by project", error);
        throw error;
    }
};
export const getTaskById = async (projectId, taskId) => {
    try {
        const response = await Api.get(`v1/project/${projectId}/task/${taskId}`);
        return response.data.data;
    }
    catch (error) {
        console.error("Error fetching task by ID", error);
        throw error;
    }
};
export const updateTask = async (projectId, taskId, task) => {
    try {
        const response = await Api.put(`v1/project/${projectId}/task/${taskId}`, task);
        return response.data;
    }
    catch (error) {
        console.error("Error updating task status", error);
        throw error;
    }
};
export const getComments = async (projectId, taskId) => {
    try {
        const response = await Api.get(`v1/project/${projectId}/task/${taskId}/comment`);
        return response.data.data;
    }
    catch (error) {
        console.error("Error fetching tasks by project", error);
        throw error;
    }
};
export const addComment = async (projectId, taskId, parent_id, content) => {
    try {
        const response = await Api.post(`/v1/project/${projectId}/task/${taskId}/comment`, {
            parent_id,
            content,
        });
        return response.data;
    }
    catch (error) {
        console.error("Error adding comment", error);
        throw error;
    }
};
export const updateComment = async (projectId, taskId, commentId, content) => {
    try {
        const response = await Api.put(`/v1/project/${projectId}/task/${taskId}/comment/${commentId}`, { content });
        return response.data;
    }
    catch (error) {
        console.error("Error updating comment", error);
        throw error;
    }
};
export const deleteComment = async (projectId, taskId, commentId) => {
    try {
        const response = await Api.delete(`/v1/project/${projectId}/task/${taskId}/comment/${commentId}`);
        return response.data;
    }
    catch (error) {
        console.error("Error deleting comment", error);
        throw error;
    }
};
