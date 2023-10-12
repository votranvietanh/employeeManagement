import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
    registerUser, authenticateUser, getUser, deleteUser
    , getUserById
    , updateUserRole
    , updateUserInfo
    , updateUserPassword
} from './userApi';


import jwt_decode from "jwt-decode";

export const useGetUser = () => {
    return useQuery('user', getUser);
};


export const useGetUserById = (id) => {
    return useQuery(['user', id], () => getUserById(id));
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        }
    })
}

export const useUpdateUserRole = () => {
    const queryClient = useQueryClient();
    return useMutation(updateUserRole, {
        onSuccess: () => {
            queryClient.invalidateQueries('user')
        }
    })
}

export const useUpdateUserInfo = () => {
    const queryClient = useQueryClient();
    return useMutation(updateUserInfo, {
        onSuccess: () => {
            queryClient.invalidateQueries('user')
        }
    })
}

export const useUpdateUserPassword = () => {
    const queryClient = useQueryClient();
    return useMutation(updateUserPassword, {
        onSuccess: () => {
            queryClient.invalidateQueries('user')
        }
    })
}



export const useRegisterUser = () => {
    const queryClient = useQueryClient();

    return useMutation(registerUser, {
        onSuccess: () => {
            queryClient.invalidateQueries('user');
        }
    })
}

export const useAuthenticateUser = () => {
    const queryClient = useQueryClient();

    return useMutation(authenticateUser, {
        onSuccess: (data, user) => {
            if (user.email) {
                localStorage.setItem('username', user.email.toString());
            }
            else if (user.username) {
                localStorage.setItem('username', user.username.toString());
            }
            //Trình duyệt chrome sẽ không update visually các key/value của localStorage in realtime
            localStorage.setItem('token', JSON.stringify(data)); // store the token on LocalStorage as a string
            localStorage.setItem('role', jwt_decode(data.data).role) //lấy role từ claims của token

            queryClient.invalidateQueries('user');
        },
    })
}
