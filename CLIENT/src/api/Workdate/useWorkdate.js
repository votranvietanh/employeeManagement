import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getWorkdate, deleteWorkdate, deleteWorkdateList, addWorkdate, getWorkdateById, updateWorkdate } from './workdateApi';

export const useGetWorkdate = () => {
    return useQuery('data', getWorkdate);
};


export const useGetWorkdateById = (id) => {

    return useQuery(['data', id], () => getWorkdateById(id));
}

export const useDeleteWorkdate = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteWorkdate, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}

export const useDeleteWorkdateList = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteWorkdateList, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}

export const useAddWorkdate = () => {
    const queryClient = useQueryClient();

    return useMutation(addWorkdate, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}

export const useUpdateWorkdate = () => {
    const queryClient = useQueryClient();

    return useMutation(updateWorkdate, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}