import { createSlice } from '@reduxjs/toolkit';

const initialState = [
    { id: 1, fullName: 'Snow', sex: true, address: 'Quy Nhon', phone: '0322564785', team: 'ReactJs', moneyPerHour: 4, position: 'Dev' },
    { id: 2, fullName: 'Wolf', sex: false, address: 'Quy Nhon', phone: '023981323', team: 'AngularJs', moneyPerHour: 4, position: 'Leader' },
    { id: 3, fullName: 'Gwen', sex: true, address: 'Quy Nhon', phone: '032198321', team: 'PHP', moneyPerHour: 4, position: 'Dev' },
    { id: 4, fullName: 'Peter', sex: true, address: 'Quy Nhon', phone: '0093094373', team: 'NodeJs', moneyPerHour: 4, position: 'Leader' },
    { id: 5, fullName: 'Lel', sex: false, address: 'Quy Nhon', phone: '089238272', team: 'HR', moneyPerHour: 4, position: 'Dev' },
    { id: 6, fullName: 'Leon', sex: false, address: 'Quy Nhon', phone: '0928390273', team: 'IT', moneyPerHour: 4, position: 'Leader' },
]

const employeeSlice = createSlice({
    name: 'employee',
    initialState,
    reducers: {
        //Add employee
        employeeAdded: (state, action) => {
            state.unshift(action.payload)
        },
        employeeDelete: (state, action) => {
            const idToDelete = action.payload
            return state.filter(employee => employee.id !== idToDelete)
        },

        employeeDeleteSelected: (state, action) => {
            const idArrToDelete = action.payload
            return state.filter((employee) => !idArrToDelete.includes(employee.id));

        }
    }
})

export const { employeeAdded, employeeDelete, employeeDeleteSelected } = employeeSlice.actions

export default employeeSlice.reducer