import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employees/employeeSlice';
import userReducer from '../features/user/userSlice';
//declare 1 state object global có tên post
export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    user: userReducer
  },
});
