import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Grid, TextField, InputAdornment } from '@mui/material';
import './user.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { userLogin } from './userSlice';
// import { selectUser, selectToken } from './userSlice';
import { FaMailBulk } from "react-icons/fa";


import Button from '@mui/material/Button/Button';


const UserForgetPassword = () => {
    const [email, setEmail] = useState("")

    const onEmailChange = (e) => {
        setEmail(e.target.value)
    }


    return (
        <div className="user-form-container">
            <Box className="login-form">
                <div className="login-form__title">
                    <p>Forget Password</p>
                </div>
                <Box sx={{ flexGrow: 1, height: 'fit-content' }}>
                    <Grid container spacing={3} rowSpacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                onChange={onEmailChange}
                                value={email}
                                required
                                id="email"
                                label="Email of the user"
                                variant='outlined'
                                fullWidth={true}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <FaMailBulk />
                                        </InputAdornment>
                                    )
                                }}
                                helperText="This will send link confirm email for password reset"
                            // error={fullName.length < 1}
                            />
                             <Link to="/">
                                <div>
                                    <p className='text__recoverypassword'>{"Back"}</p>
                                </div>
                            </Link>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="btn btn--form">
                                <Button className="btn__login" >Reset Password</Button>
                                {/* <Button onClick={onLogOut}>Logout</Button> */}
                            </div>
                        </Grid>

                    </Grid>
                </Box>
            </Box>
        </div>
    )
};

export default UserForgetPassword;