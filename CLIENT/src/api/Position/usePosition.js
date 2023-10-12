import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getPosition, deletePosition, addPosition, getPositionById, updatePosition } from './positionApi';


export const useGetPosition = () => {
    return useQuery('position', getPosition);
};


export const useGetPositionById = (id) => {

    return useQuery(['position', id], () => getPositionById(id));

}

export const useDeletePosition = () => {
    const queryClient = useQueryClient();

    return useMutation(deletePosition, {
        onSuccess: () => {
            queryClient.invalidateQueries('position');
        }
    })
}

export const useAddPosition = () => {
    const queryClient = useQueryClient();

    return useMutation(addPosition, {
        onSuccess: () => {
            queryClient.invalidateQueries('position');
        }
    })
}

export const useUpdatePosition = () => {
    const queryClient = useQueryClient();

    return useMutation(updatePosition, {
        onSuccess: () => {
            queryClient.invalidateQueries('position');
        }
    })
}