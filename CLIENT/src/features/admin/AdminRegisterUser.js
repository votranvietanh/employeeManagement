import React, { useState } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { Box, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'

import { FaPlusCircle } from "react-icons/fa";
import { useRegisterUser } from '../../api/User/useUser';

const AdminRegisterUser = () => {
    //style
    const dialogTitleStyle = {
        backgroundColor: '#4e54ed',
        color: 'white'
    }

    const helpTextStyle = {
        opacity: "1",
        color: "green"
    }
    //--------------------------------

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");


    const [errorUsername, setErrorUserName] = useState(false);
    const [errorIncludeUpperCase, setErrorIncludeUpperCase] = useState(false);
    const [errorIncludeNumber, setErrorIncludeNumber] = useState(false);
    const [errorIncludeSpecial, setErrorIncludeSpecial] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
    const registerUser = useRegisterUser();


    //
    const onUsernameChange = (e) => {
        const regex = /^[a-zA-Z0-9äöüÄÖÜ]*$/;
        setUsername(e.target.value);
        if (e.target.value === "" || !regex.test(e.target.value)) {
            setErrorUserName(false)
        }
        else if (regex.test(e.target.value)) {
            setErrorUserName(true)
        }

    }
    const onPasswordChange = (e) => {
        const regexUpperCase = /^(?=.*[A-Z]).+$/
        const regexNumber = /^(?=.*\d).+$/
        const regexSpecial = /^(?=.*[!@#$%^&*.<>,]).+$/
        setPassword(e.target.value)
        if (regexUpperCase.test(e.target.value)) {
            setErrorIncludeUpperCase(true);
        } else {
            setErrorIncludeUpperCase(false);
        }
        if (regexNumber.test(e.target.value)) {
            setErrorIncludeNumber(true);
        } else {
            setErrorIncludeNumber(false);
        }
        if (regexSpecial.test(e.target.value)) {
            setErrorIncludeSpecial(true);
        } else {
            setErrorIncludeSpecial(false);
        }
    }
    const onConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value)
        if (e.target.value === password) {
            setErrorConfirmPassword(true);
        }
    }

    //Đăng Ký
    const onRegisterUser = async (user) => {
        await registerUser.mutateAsync(user);
        console.log(user)
    };

    const onRegisterClicked = () => {
        if (confirmPassword !== password) {
            alert("Password not match")
            return
        }
        onRegisterUser({
            username,
            password
        })
    };

    // Open/Close Dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box>
            <IconButton onClick={handleClickOpen}>
                <span style={{ color: "white", marginRight: "8px", fontWeight: "bold" }}>Register User</span>
                <FaPlusCircle className="datagrid-icon" style={{ color: "white", fontSize: "16px" }} />
            </IconButton>
            <Dialog
                maxWidth={'sm'} open={open} onClose={handleClose}>
                <DialogTitle style={dialogTitleStyle}>Registing New User</DialogTitle>
                <DialogContent style={{
                    paddingTop: '16px',
                    paddingBottom: '16px'
                }}>

                    <Box sx={{ flexGrow: 1, height: 'fit-content' }}>
                        <Grid container spacing={3} rowSpacing={3}>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={onUsernameChange}
                                    value={username}
                                    required
                                    id="username"
                                    label="Username"
                                    variant='outlined'
                                    fullWidth={true}
                                // error={fullName.length < 1}
                                />
                                <div className={errorUsername ? "helper-text-allow" : "helper-text"}>* Not include special character</div>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={onPasswordChange}
                                    value={password}
                                    required
                                    id="username"
                                    label="Password"
                                    variant='outlined'
                                    fullWidth={true}
                                    type="password"
                                // error={fullName.length < 1}
                                />
                                <div className={errorIncludeUpperCase ? "helper-text-allow" : "helper-text"}>* Atleast 1 uppercase word</div>
                                <div className={errorIncludeSpecial ? "helper-text-allow" : "helper-text"}>* Atleast 1 special character (!@#$%^&*...)</div>
                                <div className={errorIncludeNumber ? "helper-text-allow" : "helper-text"}>* Atleast 1 Number</div>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={onConfirmPasswordChange}
                                    value={confirmPassword}
                                    required
                                    id="username"
                                    label="Confirm Password"
                                    variant='outlined'
                                    fullWidth={true}
                                    type="password"
                                // error={fullName.length < 1}
                                />
                                <div className={errorConfirmPassword ? "helper-text-allow" : "helper-text"}>* Password matched</div>
                            </Grid>
                        </Grid>
                    </Box>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CANCEL</Button>
                    <Button onClick={onRegisterClicked}>SUBMIT</Button>
                    {/* <Button onClick={onSubmitEmployeeWithImageClicked}>SUBMIT</Button> */}
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminRegisterUser;
