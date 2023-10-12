// import React, { useState } from 'react';

// import { Box, Grid, TextField, InputAdornment, Dialog, Button } from '@mui/material';
// import { Link } from 'react-router-dom';
// import './user.css';
// import { useRegisterUser } from '../../api/User/useUser';
// import { FaUserAlt, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
// const UserRegister = () => {

//     //Style
//     const [iconUserFocusStyle, setIconUserFocusStyle] = useState("");
//     const [iconLockFocusStyle, setIconLockFocusStyle] = useState("login-form--lockicon-unblur")

//     const [inputType, setInputType] = useState("password");

//     //style khi người dùng nhấn vào form
//     const onIconFocus = (e) => {
//         if (e.target.id === "username") {
//             setIconUserFocusStyle('login-form--usericon');
//         }
//         if (e.target.id === "password") {
//             setIconLockFocusStyle('login-form--lockicon')
//         }

//     }

//     //Style khi nhấn ra ngoài form
//     const onIconBlur = (e) => {
//         if (e.target.id === "username") {
//             setIconUserFocusStyle('');
//         }
//         setIconLockFocusStyle('login-form--lockicon-unblur');
//     }

//     //------------------------------------------

//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [confirmPassword, setConfirmPassword] = useState("");

//     const registerUser = useRegisterUser();


//     //
//     const onUsernameChange = (e) => {
//         setUsername(e.target.value)
//     }
//     const onPasswordChange = (e) => {
//         setPassword(e.target.value)
//     }


//     //Đăng Ký
//     const onRegisterUser = async (user) => {
//         await registerUser.mutateAsync(user);
//         console.log(user)
//     };

//     const onRegisterClicked = () => {
//         onRegisterUser({
//             username,
//             password
//         })
//     };



//     return (
//         <div className="user-form-container">
//             <Box className="login-form">
//                 <div className="login-form__title">
//                     <p>Sign up</p>
//                 </div>
//                 <Box sx={{ flexGrow: 1, height: 'fit-content', width: "100%" }}>
//                     <Grid container spacing={3} rowSpacing={5}>
//                         <Grid item xs={12}>
//                             <TextField
//                                 onChange={onUsernameChange}
//                                 onFocus={onIconFocus}
//                                 onBlur={onIconBlur}
//                                 value={username}
//                                 required
//                                 id="username"
//                                 label="Username"
//                                 variant='outlined'
//                                 fullWidth={true}
//                             // error={fullName.length < 1}
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 onChange={onPasswordChange}
//                                 onFocus={onIconFocus}
//                                 onBlur={onIconBlur}
//                                 value={password}
//                                 required
//                                 id="password"
//                                 label="Password"
//                                 variant='outlined'
//                                 fullWidth={true}
//                                 type="password"
//                             />
//                         </Grid>
//                         <Grid item xs={12}>
//                             <TextField
//                                 value={confirmPassword}
//                                 required
//                                 id="passwordConfirm"
//                                 label="Confirm Password"
//                                 variant='outlined'
//                                 fullWidth={true}
//                                 type="password"
//                             />
//                             <Link to="/">
//                                 <div>
//                                     <p className='text__recoverypassword'>Sign in</p>
//                                 </div>
//                             </Link>
//                         </Grid>

//                         <Grid item xs={12}>
//                             <div className="btn btn--form">
//                                 <Button className="btn__login" onClick={onRegisterClicked}>Login</Button>
//                             </div>
//                         </Grid>

//                     </Grid>
//                 </Box>
//             </Box>
//         </div >
//     );
// };
// export default UserRegister;