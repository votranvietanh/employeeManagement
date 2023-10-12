import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import SearchBar from './SearchBar';
import EmployeeList from './EmployeeList';
import EmployeeAdd from './EmployeeAdd';
import ConfirmDeleteDialog from '../global/ConfirmDeleteDialog';

import { useDispatch, useSelector } from 'react-redux';
import { employeeDeleteSelected } from './employeeSlice';
import { userInfoSave, selectUser } from '../user/userSlice';
import { useTranslation } from 'react-i18next';

import { useGetEmployee, useDeleteEmployee, useDeleteEmployeeList, useAddEmployee, useAddEmployeeWithImage } from '../../api/Employee/useEmployee';
import LoadingScreen from '../global/LoadingScreen';

import './Employee.css';


const Employee = () => {

    //----------------------------------------
    //Lấy data user từ store
    const selectUserInfo = useSelector(selectUser);

    //Sử dụng translate
    const { t } = useTranslation();

    //Fetch data employee
    const { data, isLoading, error } = useGetEmployee();

    const [selectedRows, setSelectedRows] = useState([]);
    const deleteEmployee = useDeleteEmployee();
    const deleteEmployeeList = useDeleteEmployeeList();
    const addEmployee = useAddEmployee();
    const addEmployeeWithImage = useAddEmployeeWithImage();


    //Employee được search
    const [filteredEmployee, setFilteredEmployee] = useState("");

    const dispatch = useDispatch();

    //Set userinfo cho redux store
    useEffect(() => {
        const roleObj = localStorage.getItem('role');
        const userObj = localStorage.getItem('username');
        if (roleObj || userObj) {
            dispatch(userInfoSave({ user: userObj, role: roleObj }))
        }
    }, [selectUserInfo, dispatch])


    if (isLoading) {
        return <LoadingScreen />
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    //Thêm employee
    const onAddEmployee = async (employee, positionID, teamID) => {
        await addEmployee.mutateAsync({
            employee,// Gọi API với formData
            positionID,
            teamID,
        });
    };

    //Thêm employee với image
    const onAddEmployeeWithImage = async (employee, file, positionID, teamID) => {
        await addEmployeeWithImage.mutateAsync({ employee, file, positionID, teamID })
    }

    //Xóa list Employee
    const onDeleteEmployeeList = async (idList) => {
        await deleteEmployeeList.mutateAsync(idList);
    }

    //Xóa 1 Employee
    const onDeleteEmployee = async (id) => {
        await deleteEmployee.mutateAsync(id);
    }

    //Take state selectedRows from EmployeeList
    const onRowSelected = (value) => {
        setSelectedRows(value);
    }

    //hàm này từ redux chưa có chỗ để xài
    const onDeleteSelectedRows = () => {
        dispatch(employeeDeleteSelected(selectedRows));
    };

    //----------------------------------------
    //Search method
    const handleSearch = (query) => {
        var searchResult = data.filter((employee) => employee.fullName.toLowerCase().indexOf(query.toLowerCase()) !== -1); //đưa tất cả về lowercase
        setFilteredEmployee(searchResult);
    }

    //Kiểm tra role để hiện thi giao diện
    function isUserAllow() {
        //role từ redux store
        if (selectUserInfo.role === "ROLE_USER") {
            return true
        }
        return false
    };

    return (
        <>
        <Box>
            <Box className="employee-option">
                <p>{t('employee.capital')}</p>
                <div className="align-right">
                    <div style={{ margin: "auto", display: 'flex' }}>
                        <EmployeeAdd
                            onAddEmployeeWithImage={onAddEmployeeWithImage}
                            isUserAllow={isUserAllow}
                            selectUserInfo={selectUserInfo}

                            onAddEmployee={onAddEmployee}
                        />
                        <ConfirmDeleteDialog
                            isUserAllow={isUserAllow}
                            selectUserInfo={selectUserInfo}
                            onDeleteEmployeeList={onDeleteEmployeeList}
                            selectedRows={selectedRows}
                            onDeleteSelectedRows={onDeleteSelectedRows}
                        />
                    </div>
                </div>
            </Box>
            <Box className="employee-search">
                <p>{t('total')} {Object.keys(data).length} {t('employee')}</p>
                <div className="search">
                    <SearchBar data={data} handleSearch={handleSearch} />
                </div>
            </Box>
            <Box className="employee-list">
                <p>Search result</p>
                {/* truyền props để nhận lại list id các dòng đã được check */}
                <EmployeeList
                    filteredEmployee={filteredEmployee}
                    isUserAllow={isUserAllow}
                    selectUserInfo={selectUserInfo}
                    onDeleteEmployee={onDeleteEmployee}
                    data={data}
                    onRowSelected={onRowSelected} />
            </Box>
        </Box>
        </>
    );
};

export default Employee;