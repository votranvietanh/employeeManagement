import { createSlice } from '@reduxjs/toolkit';

//Khởi tạo giá trị cho store ngày từ đầu tránh state lost khi refresh
const roleObj = localStorage.getItem('role');
const userObj = localStorage.getItem('username');

const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: userObj,
        role: roleObj,
    },
    reducers: {
        //Login user
        userInfoSave: (state, action) => {
            state.user = action.payload.user;
            state.role = action.payload.role;
        },
    }
})

export const { userInfoSave } = userSlice.actions

// export const selectRole = (state) => state.user.role;
export const selectUser = (state) => state.user;

export default userSlice.reducer