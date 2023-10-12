import React from 'react';
import { Box } from '@mui/material';
import { FaUsers, FaLock } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
const SideNavigateBar = () => {
    return (
        <div>
            <Box className="sidebar-container">
                <div className="sidebar">
                    <div className="sidebar-item">
                        <div className="sidebar-item-holder">
                            <div className="sidebar-icon"><FaUsers /></div>
                            <div className="sidebar-title">Management</div>
                        </div>
                    </div>
                    <div className="sidebar-item">
                        <div className="sidebar-item-holder">
                            <div className="sidebar-icon"><FaLock /></div>
                            <div className="sidebar-title">Change password</div>
                        </div>
                    </div>
                    <div className="sidebar-item">
                        <div className="sidebar-item-holder">
                            <div className="sidebar-icon"><FiLogOut /></div>
                            <div className="sidebar-title">Log out</div>
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    );
};

export default SideNavigateBar;