import React, { useState } from 'react';
import { Box, Button } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { FaTrashAlt } from "react-icons/fa";
import "./globalstyle.css";
import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@emotion/react';

const ConfirmDeleteDialog = (props) => {
    //style
    const noBtn = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        color: "#5262bb",
                        fontWeight: "bold",
                        width: "7em",
                        '&:hover': {
                            boxShadow: "0 0 5px 5px #e8e8e8"
                        }
                    }
                }
            }
        }
    })
    const yesBtn = createTheme({
        components: {
            MuiButton: {
                styleOverrides: {
                    root: {
                        backgroundColor: "#ececec",
                        color: "#5262bb",
                        fontWeight: "bold",
                        width: "7em",
                        '&:hover': {
                            backgroundColor: "#d6d4d4"
                        }
                    }
                }
            }
        }
    })
    //------------------------------------------
    const [open, setOpen] = React.useState(false);
    const [employeeFromRowID, setEmployeeFromRowID] = useState('');

    const handleOpenDeleteEmployee = () => {
        const filteredEmployee = props.data.find(employee => employee.employeeID === props.rowID);
        setEmployeeFromRowID(filteredEmployee)
        setOpen(true);
    };

    const handleOpenDeleteEmployeeList = () => {
        setOpen(true);
    };

    // Đóng/Mở Dialog
    const handleClose = () => {
        setOpen(false);
    };

    const confirmDelete = () => {
        props.onDeleteEmployeeList(props.selectedRows);
        handleClose();
    }

    const confirmDeleteOneEmployee = () => {
        props.onDeleteEmployee(props.rowID);
        handleClose();
    }

    // CHECKBOX NHIỀU DÒNG
    if (props.selectedRows) {
        return <div>
            <IconButton style={{ display: props.isUserAllow() ? "none" : "" }} disabled={props.selectedRows.length === 0} onClick={handleOpenDeleteEmployeeList}>
                <FaTrashAlt className="datagrid-icon" />
                <span className="icon-text">Delete</span>
            </IconButton>
            <Dialog fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle style={{
                    backgroundColor: '#4e54ed',
                    color: 'white'
                }}>
                    <span>Are you sure to delete all employee selected ?</span>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{
                        flexGrow: 1,
                        height: 'fit-content',
                        marginTop: "1rem"
                    }}>
                        <span> All <span style={{ color: "blue", fontWeight: "bold" }}>{props.selectedRows.length}</span> employee will be deleted</span>
                    </Box>
                </DialogContent>
                <DialogActions>

                    <ThemeProvider theme={noBtn}>
                        <Button onClick={handleClose}>NO</Button>
                    </ThemeProvider>

                    <ThemeProvider theme={yesBtn}>
                        <Button onClick={() => confirmDelete()}>YES</Button>
                    </ThemeProvider>
                </DialogActions>
            </Dialog>
        </div>
    }
    // CHECKBOX 1 DÒNG
    if (employeeFromRowID || employeeFromRowID === '') {
        return (
            <div>
                <IconButton style={{ display: props.isUserAllow() ? "none" : "" }} onClick={handleOpenDeleteEmployee}>
                    <FaTrashAlt className="datagrid-icon" size={18} style={{ color: "black" }} />
                    <span className="icon-text">Delete</span>
                </IconButton>
                <Dialog fullWidth={true} open={open} onClose={handleClose}>
                    <DialogTitle style={{
                        backgroundColor: '#4e54ed',
                        color: 'white'
                    }}>
                        Delete Employee
                    </DialogTitle>
                    <DialogContent>
                        <Box sx={{
                            flexGrow: 1,
                            height: 'fit-content',
                            marginTop: "1rem"
                        }}>
                            You are about to delete Employee: <span style={{ color: "blue", fontWeight: "bold" }} >{employeeFromRowID.fullName}</span>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <ThemeProvider theme={noBtn}>
                            <Button onClick={handleClose}>NO</Button>
                        </ThemeProvider>

                        <ThemeProvider theme={yesBtn}>
                            <Button onClick={() => confirmDeleteOneEmployee()}>YES</Button>
                        </ThemeProvider>

                    </DialogActions>
                </Dialog>
            </div>
        );
    }

};

export default ConfirmDeleteDialog;

//Dùng if clause để render dialog dựa trên props truyền vào
// Delete all
// Delete từng người thì thông báo cả tên Employee