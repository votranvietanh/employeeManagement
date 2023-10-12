import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton/IconButton';
import { Link } from 'react-router-dom';
import ConfirmDeleteDialog from '../global/ConfirmDeleteDialog';
import { FaInfo } from "react-icons/fa";

import { useTranslation } from 'react-i18next';
import CustomPagination from '../global/CustomPagination';
import dataGridTheme from '../global/dataGridTheme';
import { ThemeProvider } from '@emotion/react';

import "./Employee.css"
const EmployeeList = (props) => {

    //style

    //---------------------------------------------------
    const isUserAllow = props.isUserAllow;
    const { t } = useTranslation();
    const [selectedRows, setSelectedRows] = useState([]);

    // const [filteredEmployee, setFilteredEmployee] = useState("");

    // //
    // useEffect(() => {
    //     const filteredEmployee = props.filteredEmployee
    //     console.log(filteredEmployee)
    // }, [props.filteredEmployee])

    //Custom cell của datagrid
    const renderButton = (params) => {
        return (
            <div style={{ display: "flex" }}>
                <Link to={`/employee/${params.row.id}`}>
                    <IconButton>
                        <FaInfo className="datagrid-icon" size={18} style={{ color: '#428af5' }} />
                        <span className="icon-text">Info</span>
                    </IconButton>
                </Link>
                <ConfirmDeleteDialog
                    isUserAllow={isUserAllow}
                    onDeleteEmployee={props.onDeleteEmployee}
                    rowID={params.row.id}
                    data={props.data} />
            </div>
        )
    }

    //Cập nhật danh sách id của row
    const { onRowSelected } = props;
    useEffect(() => {
        onRowSelected(selectedRows);
    }, [selectedRows, onRowSelected])

    //newSelection: trả về các id của row đã được chọn từ props onRowSelectionModelChange
    const handleSelectionModelChange = (newSelection) => {
        setSelectedRows(newSelection);
    }

    const columns = [
        { field: 'no', headerName: "No", width: 70 },
        { field: 'fullName', headerName: `${t('table.header.name')}`, width: 200 },
        { field: 'phone', headerName: `${t('table.header.phone')}`, width: 140 },
        { field: 'team', headerName: `${t('table.header.team')}`, width: 130 },
        { field: 'position', headerName: `${t('table.header.position')}`, width: 130 },
        { field: 'option', headerName: `${t('table.header.option')}`, minWidth: 130, renderCell: renderButton, sortable: false },
    ]

    //lấy danh sách data từ Employee.js
    const empData = props.filteredEmployee;

    //đảo chiều list để hiển thị employee mới nhất
    const reverseEmpData = [...empData].reverse();
    const rows = (reverseEmpData || []).map((row, index) => {
        return {
            ...row,
            id: row.employeeID,
            no: index + 1,
            team: row.teamName,
            position: row.positionName,
        };
    });
    return (
        <>
        <Box style={{ height: 375, width: '100%' }}>
            <ThemeProvider theme={dataGridTheme}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5
                            }
                        }
                    }}
                    slots={{
                        pagination: CustomPagination,
                    }}
                    checkboxSelection
                    onRowSelectionModelChange={handleSelectionModelChange}
                    rowSelectionModel={selectedRows}
                    // pageSizeOptions={[5, 10, 20]}
                    key="employee-list"
                    disableRowSelectionOnClick={true}
                />
            </ThemeProvider>
        </Box>

        </>
    );
};

export default EmployeeList;