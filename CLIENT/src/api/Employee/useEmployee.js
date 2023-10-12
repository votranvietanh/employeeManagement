import { useQuery, useMutation, useQueryClient } from 'react-query';
import { updateEmployeeImage, removeEmployeeFromTeam, downloadImageFromFileSystem, getEmployee, deleteEmployee, deleteEmployeeList, addEmployee, getEmployeeById, updateEmployee, addEmployeeWithImage } from './employeeApi';

export const useGetEmployee = () => {
    return useQuery('data', getEmployee);
};


export const useGetEmployeeById = (id) => {
    return useQuery(['data', id], () => getEmployeeById(id));
}

export const useDeleteEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteEmployee, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}

export const useDownloadImageFromFileSystem = (fileName, id) => {
    return useQuery(['data', fileName, id], () => downloadImageFromFileSystem(fileName, id));
};


export const useDeleteEmployeeList = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteEmployeeList, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}

export const useAddEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation(addEmployee, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}

export const useUpdateEmployee = () => {
    const queryClient = useQueryClient();

    return useMutation(updateEmployee, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}

export const useUpdateEmployeeImage = () => {
    const queryClient = useQueryClient();

    return useMutation(updateEmployeeImage, {
        onSuccess: () => {
            queryClient.invalidateQueries('data')
        }
    })
}

export const useRemoveEmployeeFromTeam = () => {
    const queryClient = useQueryClient();

    return useMutation(removeEmployeeFromTeam, {
        onSuccess: () => {
            queryClient.invalidateQueries('team');
        }
    })
}

export const useAddEmployeeWithImage = () => {
    const queryClient = useQueryClient();

    return useMutation(addEmployeeWithImage, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}