import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box/Box';
import TeamAdd from './TeamAdd';
import { DataGrid } from '@mui/x-data-grid';
import { Grid, IconButton } from '@mui/material';
import { FaAddressCard, FaUserSlash, FaInfo } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useGetTeam } from '../../api/Team/useTeam';
import "./Team.css";
import dataGridTheme from '../global/dataGridTheme';
import { ThemeProvider } from '@emotion/react';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { selectUser } from '../user/userSlice';
import { useRemoveEmployeeFromTeam } from '../../api/Employee/useEmployee';

const Team = () => {


    const { t } = useTranslation();

    const { data, isLoading, error } = useGetTeam();
    const [employeeList, setEmployeeList] = useState();

    useEffect(() => {
        if (data) {
            const tempData = data.find(team => team.teamID === 1);
            setEmployeeList(tempData.employee);
        }
    }, [data])

    const renderButton = (params) => {
        return (
            <div>
                <IconButton style={{ cursor: "pointer" }} onClick={() => onTeamDetailClicked(params.row.id)}>
                    <FaAddressCard style={{ color: 'black', fontSize: "20px" }} />
                </IconButton>
            </div>
        )
    }
    const renderRemoveEmployeeFromTeamButton = (params) => {
        console.log(params.row.teamName)
        if (params.row.teamName !== "None") {
            return (
                <div style={{ display: "flex" }}>
                    <Link to={`/employee/${params.row.id}`}>
                        <IconButton>
                            <FaInfo className="datagrid-icon" size={18} style={{ color: '#428af5' }} />
                            <span className="icon-text">Info</span>
                        </IconButton>
                    </Link>
                    <IconButton style={{ cursor: "pointer" }} onClick={() => onRemoveEmployeFromTeam(params.row.id)}>
                        <FaUserSlash className="datagrid-icon" size={18} style={{ color: '#428af5' }} />
                        <span className="icon-text">Remove</span>
                    </IconButton>
                </div>
            )
        }
        return (
            <div style={{ display: "flex" }}>
                <Link to={`/employee/${params.row.id}`}>
                    <IconButton>
                        <FaInfo className="datagrid-icon" size={18} style={{ color: '#428af5' }} />
                        <span className="icon-text">Info</span>
                    </IconButton>
                </Link>
            </div>
        )

    }

    //Employee bị remove sẽ đưa vào team có tên "None"
    const removeEmployeeFromTeam = useRemoveEmployeeFromTeam();
    const onRemoveEmployeFromTeam = async (id) => { //truyền id của nhân viên
        await removeEmployeeFromTeam.mutateAsync({ id })
        setEmployeeList(employeeList.filter(item => item.employeeID !== id))
    }

    //Lấy data user từ store
    const selectUserInfo = useSelector(selectUser);

    //Kiểm tra role để hiện thi giao diện
    function isUserAllow() {
        //role từ redux store
        if (selectUserInfo.role === "ROLE_USER") {
            return true
        }
        return false
    };

    //-------------------------------------------------

    //Truyền id của team (từ params của row) để truy vấn danh sách employee
    //Tạo 1 list team mới vì 2 datagrid không thể dùng chung 1 data có id giống nhau
    const onTeamDetailClicked = (id) => {
        const team = data.find(team => team.teamID === id);
        setEmployeeList(team.employee);
    }

    //--------------------------------------------------


    const columnsTeam = [
        { field: 'teamID', headerName: 'No', width: 65 },
        { field: 'teamName', headerName: `${t('table.header.teamname')}`, width: 112 },
        { field: 'detail', headerName: `${t('table.header.detail')}`, width: 100, renderCell: renderButton, sortable: false },
    ]
    const rowsTeam = (data || []).map((row, index) => {
        return {
            ...row,
            id: row.teamID,
            no: index + 1,
            team: row.teamName
        };
    });
    //---------------------------------------------
    const columnsEmployee = [
        { field: 'employeeID', headerName: 'No', width: 50 },
        { field: 'fullName', headerName: `${t('table.header.name')}`, width: 160 },
        { field: 'phone', headerName: `${t('table.header.phone')}`, width: 100 },
        { field: 'address', headerName: `${t('table.header.address')}`, width: 100 },
        { field: 'sex', headerName: `${t('table.header.sex')}`, width: 80, valueGetter: (params) => params.row.sex ? "Male" : "Female" },
        { field: 'option', headerName: `${t('table.header.option')}`, width: 100, renderCell: renderRemoveEmployeeFromTeamButton, sortable: false }
    ]
    const rowsEmployee = (employeeList || []).map((row, index) => {
        return {
            ...row,
            id: row.employeeID,
            no: index + 1,
            team: row.fullName,
        };
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <Box>
            <Box className="team-option">
                <p>Team</p>
                <div style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                    <TeamAdd isUserAllow={isUserAllow} />
                </div>
            </Box>
            <div style={{ marginTop: '1rem' }} className="table-grid">
                <Box sx={{ flexGrow: 1, height: 'fit-content' }}>
                    <Grid container spacing={1} rowSpacing={5}>
                        <Grid item xs={4}>
                            <Box style={{ height: 290, width: '100%' }}>
                                <ThemeProvider theme={dataGridTheme}>
                                    <DataGrid
                                        rows={rowsTeam}
                                        columns={columnsTeam}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 3
                                                }
                                            }
                                        }}

                                        pageSizeOptions={[]}
                                        disableRowSelectionOnClick={true}
                                    />
                                </ThemeProvider>
                            </Box>
                        </Grid>
                        <Grid item xs={8}>
                            <Box style={{ height: 290, width: '100%' }}>
                                <ThemeProvider theme={dataGridTheme}>
                                    <DataGrid
                                        rows={rowsEmployee}
                                        columns={columnsEmployee}
                                        initialState={{
                                            pagination: {
                                                paginationModel: {
                                                    pageSize: 3
                                                }
                                            }
                                        }}
                                        pageSizeOptions={[3, 6, 12]}
                                        disableRowSelectionOnClick={true}
                                    />
                                </ThemeProvider>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </Box>
    );
};

export default Team;
