import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getAdvance, deleteAdvance, deleteAdvanceList, addAdvance, getAdvanceById, updateAdvance } from './advanceApi';

export const useGetAdvance = () => {
    return useQuery('data', getAdvance);
};


export const useGetAdvanceById = (id) => {

    return useQuery(['data', id], () => getAdvanceById(id));
}

export const useDeleteAdvance = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteAdvance, {//useMutation: nhận 1 hàm trả về promised
        onSuccess: () => {
            queryClient.invalidateQueries('data'); //invalidateQueries: gửi yêu cầu cập nhật dữ liệu của key 'data'
        }
    })
}

export const useDeleteAdvanceList = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteAdvanceList, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}

export const useAddAdvance = () => {
    const queryClient = useQueryClient();

    return useMutation(addAdvance, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}

export const useUpdateAdvance = () => {
    const queryClient = useQueryClient();

    return useMutation(updateAdvance, {
        onSuccess: () => {
            queryClient.invalidateQueries('data');
        }
    })
}