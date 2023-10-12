import axios from 'axios';

const advanceApi = axios.create({
    baseURL: "http://localhost:8082"
})

advanceApi.interceptors.request.use(
    (config) => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const token = JSON.parse(storedToken).data;
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

export const getAdvance = async (advance) => {
    const response = await advanceApi.get("/advance/getAll", advance)
    return response.data;
}

export const getAdvanceById = async (id) => {
    const response = await advanceApi.get(`/advance/${id}`, id)
    return response.data;
}

export const addAdvance = async ({ advance, employeeID }) => {
    return await advanceApi.post(`/advance/add?employeeID=${employeeID}`, advance)
}

export const updateAdvance = async (advance) => {
    return await advanceApi.patch(`/advance/update/${advance.advanceID}`, advance)
}

export const deleteAdvance = async (id) => {
    return await advanceApi.delete(`/advance/${id}`, id)
}

export const deleteAdvanceList = async (idList) => {
    return await advanceApi.delete('/advance/deleteList', { data: idList });
}

export default advanceApi;