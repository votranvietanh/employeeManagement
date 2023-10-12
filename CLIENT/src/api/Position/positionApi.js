import axios from 'axios';

const positionApi = axios.create({
    baseURL: "http://localhost:8082"
})


positionApi.interceptors.request.use(
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



export const getPosition = async (position) => {
    const response = await positionApi.get("/position/getAll", position)
    return response.data;
}

export const getPositionById = async (id) => {
    const response = await positionApi.get(`/position/${id}`, id)
    return response.data;
}

export const addPosition = async (position) => {
    return await positionApi.post(`/position/add`, position)
}

export const updatePosition = async (position) => {
    return await positionApi.patch(`/position/update/${position.positionID}`, position)
}

export const deletePosition = async (id) => {
    return await positionApi.delete(`/position/${id}`, id)
}

export default positionApi;