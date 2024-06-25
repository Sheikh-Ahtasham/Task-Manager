import Api from "./Api";
export const getProfile = async () => {
    const response = await Api.get(`/v1/profile`);
    return response.data.data;
};
export const updateProfile = async (profileData) => {
    const response = await Api.post(`/v1/profile`, profileData);
    return response.data;
};
