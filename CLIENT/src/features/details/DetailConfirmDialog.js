import React from 'react';
import { Box, Button } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { FaTrashAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';

import createTheme from '@mui/material/styles/createTheme';
import { ThemeProvider } from '@emotion/react';

const DetailConfirmDialog = (props) => {
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
    //-----------------------------------------
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };



    return (
        <div>
            <IconButton onClick={handleClickOpen} style={{ display: props.isUserAllow() ? "none" : "" }}>
                <FaTrashAlt />
            </IconButton>
            <Dialog fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle style={{
                    backgroundColor: '#4e54ed',
                    color: 'white'
                }}>
                    <span>Delete Employee</span>

                </DialogTitle>
                <DialogContent>
                    <Box sx={{
                        flexGrow: 1,
                        height: 'fit-content',
                        marginTop: "1rem"
                    }}>
                        <span>Do you want to delete Employee:
                             <span style={{ fontWeight: "bold" }}> {props.data.fullName}</span>
                        </span>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <ThemeProvider theme={noBtn}>
                        <Button onClick={handleClose}>NO</Button>
                    </ThemeProvider>
                    <Link style={{
                        textDecoration: "none",
                        marginLeft: "1rem"
                    }}
                        to="/">
                        <ThemeProvider theme={yesBtn}>
                            <Button onClick={() => props.onDeleteEmployee(props.data.employeeID)}>YES</Button>
                        </ThemeProvider>
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DetailConfirmDialog;

//Dùng if clause để render dialog dựa trên props truyền vào
// Delete all
// Delete từng người thì thông báo cả tên Employee