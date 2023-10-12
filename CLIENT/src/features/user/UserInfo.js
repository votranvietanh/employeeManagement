import React from 'react';
import { Box, Grid } from '@mui/material';
import { FaUser } from "react-icons/fa";
import SideNavigateBar from '../global/SideNavigateBar';
import './user.css'
const UserInfo = () => {
    return (
        <div className="container">
            <Box sx={{ flexGrow: 1, height: 'fit-content' }}>
                <Grid item xs={12} container spacing={2} rowSpacing={5}>
                    <Grid item xs={12}>
                        <div className="user-container">
                            <div>
                                <div className="user__title">Tran Van On</div>
                                <div>CCCD: 0291928i31</div>
                            </div>
                            <div className="btn-group">
                                <button className="button button--primary">Cancel</button>
                                <div className="col-space"/>
                                <button className="button button--secondary">Save</button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <div className="row-space" />
                <Grid item xs={12} container spacing={2} rowSpacing={5}>
                    {/* Row-2 Col-1 */}
                    <Grid item xs={4}>
                        <SideNavigateBar />
                    </Grid>
                    {/* Row-2 Col-2 */}
                    <Grid item xs={8} container spacing={2} rowSpacing={5}>
                        <Grid item xs={12}>
                            <div className="form-layout">
                                <div className="form__title">Username</div>
                                <input className="form__input" type="text"></input>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="form-layout">
                                <div className="form__title">Email <div>Display the name of user</div></div>
                                <input className="form__input" type="text"></input>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="form-layout">
                                <div className="form__title">Email <div>Display the name of user</div></div>
                                <input className="form__input" type="text"></input>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="form-layout">
                                <div className="form__title">Email <div>Display the name of user</div></div>
                                <input className="form__input" type="text"></input>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="form-layout">
                                <div className="form__title">Email <div>Display the name of user</div></div>
                                <input className="form__input" type="text"></input>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="form-layout">
                                <div className="form__title">Email <div>Display the name of user</div></div>
                                <input className="form__input" type="text"></input>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="form-layout">
                                <div className="form__title">Email <div>Display the name of user</div></div>
                                <input className="form__input" type="text"></input>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>


            </Box>
        </div >
    );
};

export default UserInfo;