import axios from 'axios';

const employeeApi = axios.create({
    baseURL: "http://localhost:8082",
})

// Set the authorization token in the headers of the employeeApi instance
employeeApi.interceptors.request.use(
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

export const getEmployee = async (employee) => {
    const response = await employeeApi.get("/employee/getAll", employee)
    return response.data;
}

export const downloadImageFromFileSystem = async (fileName, id) => {

    const response = await employeeApi.get(`/employee/${id}/image/${fileName}`, {
        responseType: 'blob',
    });

    // Assuming the response contains the absolute URL of the image
    const imageUrl = URL.createObjectURL(response.data);

    return imageUrl;
};

export const getEmployeeById = async (id) => {
    const response = await employeeApi.get(`/employee/${id}`, id)
    return response.data;
}

export const addEmployee = async ({ employee, positionID, teamID }) => {
    return await employeeApi.post(`/employee/add?positionID=${positionID}&teamID=${teamID}`, employee);

}

//Update employee với image
// export const updateEmployee = async ({ employee, positionID, teamID, file }) => {
//     const formData = new FormData();
//     formData.append('file', file);
//     for (const key in employee) {
//         formData.append(key, employee[key]);
//     }
//     return await employeeApi.put(`/employee/update?positionID=${positionID}&teamID=${teamID}`, formData)
// }

export const updateEmployee = async ({ employee, positionID, teamID }) => {
    const formData = new FormData();
    for (const key in employee) {
        formData.append(key, employee[key]);
    }
    return await employeeApi.put(`/employee/update?positionID=${positionID}&teamID=${teamID}`, formData)
}

export const updateEmployeeImage = async ({ id, file }) => {
    const formData = new FormData();
    formData.append('file', file);

    return await employeeApi.put(`/employee/updateimage/${id}`, formData)
}

export const deleteEmployee = async (id) => {
    return await employeeApi.delete(`/employee/${id}`, id)
}

export const deleteEmployeeList = async (idList) => {
    return await employeeApi.delete('/employee/deleteList', { data: idList });
}

export const removeEmployeeFromTeam = async ({ id }) => {
    return await employeeApi.put(`/employee/removefromteam/${id}`, id)
}

export const addEmployeeWithImage = async ({ employee, file, positionID, teamID }) => {

    console.log("The variable passed to employeeApi:")
    console.log("employee:" + employee)
    console.log("file:" + file)
    console.log("positionID:" + positionID)
    console.log("teamID:" + teamID)

    const formData = new FormData();
    // formData.append('positionID', positionID);
    // formData.append('teamID', teamID);
    formData.append('file', file);
    for (const key in employee) {
        formData.append(key, employee[key]);
    }

    return await employeeApi.post(`/employee/addwithimage?positionID=${positionID}&teamID=${teamID}`, formData);
}

export default employeeApi;