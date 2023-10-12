import axios from 'axios';

const teamApi = axios.create({
    baseURL: "http://localhost:8082"
})

// teamApi.interceptors.request.use(config => {
//     const storedToken = localStorage.getItem('token');
//     const token = JSON.parse(storedToken).data;
//     if (token) {
//         config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
// })
teamApi.interceptors.request.use(
    config => {
        const storedToken = localStorage.getItem('token');
        if (storedToken) {
            const token = JSON.parse(storedToken).data;
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);



export const getTeam = async (team) => {
    const response = await teamApi.get("/team/getAll", team)
    return response.data;
}

export const getTeamById = async (id) => {
    const response = await teamApi.get(`/team/${id}`, id)
    return response.data;
}

export const addTeam = async (team) => {
    return await teamApi.post(`/team/add`, team)
}

export const updateTeam = async (team) => {
    return await teamApi.patch(`/team/update/${team.teamID}`, team)
}

export const deleteTeam = async (id) => {
    return await teamApi.delete(`/team/${id}`, id)
}

export default teamApi;