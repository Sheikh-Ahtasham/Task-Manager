import Api from "./Api";
export const getUsers = async (page = 1, pageSize = 10) => {
    const response = await Api.get(`/v1/admin/user`, {
        params: {
            page,
            per_page: pageSize,
        },
    });
    return response.data.data;
};
export const createUser = async (user) => {
    const response = await Api.post(`/v1/admin/user`, user);
    return response.data;
};
export const updateUser = async (id, user) => {
    const response = await Api.put(`/v1/admin/user/${id}`, user);
    return response.data;
};
export const deleteUser = async (id) => {
    const response = await Api.delete(`/v1/admin/user/${id}`);
    return response.data;
};
