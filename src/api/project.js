import Api from "./Api";
export const getProjects = async (page = 1, pageSize = 10) => {
    const response = await Api.get(`/v1/admin/project`, {
        params: {
            page,
            per_page: pageSize,
        },
    });
    return response.data.data;
};
export const createProject = async (project) => {
    const response = await Api.post(`/v1/admin/project`, project);
    return response.data;
};
export const updateProject = async (id, project) => {
    const response = await Api.put(`/v1/admin/project/${id}`, project);
    return response.data;
};
export const deleteProject = async (id) => {
    const response = await Api.delete(`/v1/admin/project/${id}`);
    return response.data;
};
export const assignProject = async (id, userIds) => {
    const response = await Api.post(`/v1/admin/project/${id}/assign`, {
        user_ids: userIds,
    });
    return response.data;
};
export const getAssignedProjects = async (page = 1, pageSize = 10) => {
    const response = await Api.get(`/v1/project`, {
        params: {
            page,
            per_page: pageSize,
        },
    });
    return response.data.data;
};
