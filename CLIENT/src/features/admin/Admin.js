import React from 'react';
import { Box, Grid } from '@mui/material';
import './admin.css'

import { FaUser } from "react-icons/fa";
import AdminUserList from './AdminUserList';
import AdminRegisterUser from './AdminRegisterUser';
import SideNavigateBar from '../global/SideNavigateBar';
const Admin = () => {


    return (
        <>
        <div className="container">
            <Box sx={{ flexGrow: 1, height: 'fit-content' }}>
                <Grid container spacing={3} rowSpacing={5}>
                    <Grid item xs={4}>
                        <div className="information-card">
                            <div className="left-content">
                                <div className="content">
                                    <div className="title-icon-holder"><FaUser style={{ margin: "auto" }} /></div>
                                </div>
                            </div>
                            <div className="right-content">
                                <div className="content">
                                    <span>TOTAL</span>
                                    <div>4 ACTIVE ACCOUNT</div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="information-card">
                            <div className="left-content">
                                <div className="content">
                                    <div className="title-icon-holder"><FaUser style={{ margin: "auto" }} /></div>
                                </div>
                            </div>
                            <div className="right-content">
                                <div className="content">
                                    <span>USER</span>
                                    <div>4</div>
                                </div>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={4}>
                        <div className="information-card">
                            <div className="left-content">
                                <div className="content">
                                    <div className="title-icon-holder"><FaUser style={{ margin: "auto" }} /></div>
                                </div>
                            </div>
                            <div className="right-content">
                                <div className="content">
                                    <span>EDITOR</span>
                                    <div>4</div>
                                </div>
                            </div>
                        </div>
                    </Grid>

                    {/* Row2 */}
                    <Grid className="information-panel" item xs={4}>
                        <SideNavigateBar />
                    </Grid>
                    <Grid className="data-grid" item xs={8}>
                        <div className="data-grid-container">
                            <div className="button-group" style={{ display: "flex", justifyContent: "space-between", marginBottom: "16px" }}>
                                <div className="space"></div>
                                <AdminRegisterUser />
                            </div>
                            {/* USER LIST */}
                            <AdminUserList />
                        </div>
                    </Grid>
                </Grid>
                {/* <Grid container spacing={3} rowSpacing={5}>
                    <Grid item xs={4}>
                        <div style={{ outline: "1px solid black" }}>asdasdasd</div>
                    </Grid>
                    <Grid item xs={8}>
                        <div style={{ outline: "1px solid black" }}>asdasdasd</div>
                    </Grid>
                </Grid> */}
            </Box>
        </div>
        </>
    );
};

export default Admin;