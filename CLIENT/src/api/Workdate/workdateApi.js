import axios from 'axios';



const workdateApi = axios.create({
    baseURL: "http://localhost:8082"
})


workdateApi.interceptors.request.use(
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

export const getWorkdate = async (workdate) => {
    const response = await workdateApi.get("/workdate/getAll", workdate)
    return response.data;
}

export const getWorkdateById = async (id) => {
    const response = await workdateApi.get(`/workdate/${id}`, id)
    return response.data;
}

export const addWorkdate = async ({ workdate, employeeid }) => {
    return await workdateApi.post(`/workdate/add?employeeID=${employeeid}`, workdate)
}

export const updateWorkdate = async (workdate) => {
    return await workdateApi.patch(`/workdate/update/${workdate.workdateID}`, workdate)
}

export const deleteWorkdate = async (id) => {
    return await workdateApi.delete(`/workdate/${id}`, id)
}

export const deleteWorkdateList = async (idList) => {
    return await workdateApi.delete('/workdate/deleteList', { data: idList });
}

export default workdateApi;