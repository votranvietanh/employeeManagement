import axios from 'axios';

const userApi = axios.create({
    baseURL: "http://localhost:8082"
})

export const registerUser = async (user) => {
    return await userApi.post(`/user/register`, user)
}

export const authenticateUser = async (user) => {
    console.log(user)
    return await userApi.post(`/user/authenticate`, user)
}

export const getUser = async (user) => {
    const response = await userApi.get("/user/getAll", user)
    return response.data;
}

export const getUserById = async (userID) => {
    const response = await userApi.get(`/user/${userID}`, userID)
    return response.data;
}

export const updateUserRole = async ({ user, userID }) => {
    return await userApi.put(`/user/update_userrole/${userID}`, user)
}

export const updateUserInfo = async ({ user, userID }) => {
    return await userApi.put(`/user/update_userinfo/${userID}`, user)
}

export const updateUserPassword = async ({ user, userID }) => {
    return await userApi.put(`/user/update_userpassword/${userID}`, user)
}

export const deleteUser = async (userID) => {
    return await userApi.delete(`/user/${userID}`, userID)
}


export default userApi;