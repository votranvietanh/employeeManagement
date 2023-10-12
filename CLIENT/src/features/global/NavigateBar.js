import { React, useState, useEffect } from 'react';
import './globalstyle.css';
import { Box, Select, MenuItem } from '@mui/material';
import { Link } from 'react-router-dom';
import "./globalstyle.css";

import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../user/userSlice';

import { FiSettings, FiLogOut } from "react-icons/fi";
// import UKFlag from '../../assets/images/UK.png';
// import VNFlag from '../../assets/images/vietnam.png';

import { useTranslation } from 'react-i18next';


const NavigateBar = () => {

    //
    const selectUserInfo = useSelector(selectUser);

    const [username, setUsername] = useState("");
    const [userRole, setUserRole] = useState("");

    //Đổi ngôn ngữ
    const { t, i18n } = useTranslation();

    const handleLanguageChange = (event) => {
        i18n.changeLanguage(event.target.value);
    };

    //Display cho các trang khác trừ trang login
    const [currentPage, setCurrentPage] = useState('/')
    const location = useLocation();

    useEffect(() => {
        setCurrentPage(location.pathname);
    }, [currentPage, location])


    //Lấy UserInfor để hiển thị nếu đã có user lưu trên redux store
    useEffect(() => {
        if (!selectUserInfo.role && !selectUserInfo.user) {
            return
        }
        setUsername(selectUserInfo.user);
        setUserRole(selectUserInfo.role.substring(5, 10));
    }, [selectUserInfo])


    //Không cho NavBar xuất hiện nếu có đướng dẫn không phải là "/"
    function isNavBarVisible() {
        if (currentPage === "/" || currentPage === "/forget" || currentPage === "/signup") {
            return true
        }
        return false
    };

    //Style cho button của navigate bar
    const [styleEmployee, setStyleEmployee] = useState("employeeBtn--active")
    const [styleTeam, setStyleTeam] = useState("teamBtn--inactive")

    const changeEmployeeBtnStyle = () => {
        if (styleEmployee === "employeeBtn--active") {
            setStyleEmployee("employeeBtn--inactive")
            setStyleTeam("teamBtn--active")
        }
    }

    const changeTeamBtnStyle = () => {
        if (styleTeam === "teamBtn--active") {
            setStyleEmployee("employeeBtn--active")
            setStyleTeam("teamBtn--inactive")
        }
    }

    //Logout
    const onLogOut = () => {
        localStorage.clear();
        localStorage.setItem('i18nextLng', "en"); //key i18nextLng được tự động lưu vào local storage khi lần đầu khởi tạo
    }

    return (
        <>
        <Box className="user-navigate" style={{ display: isNavBarVisible() ? "none" : "" }}>
            <div></div>
            <div style={{ display: "flex", alignItems: "center" }}>
                <p className="username">{selectUserInfo.user}</p>
                <div className="dropdown">
                    <img className="dropbtn" alt="img_profile" src="https://i.natgeofe.com/n/548467d8-c5f1-4551-9f58-6817a8d2c45e/NationalGeographic_2572187_square.jpg" />
                    <div className="dropdown-content">
                        <div className="content-custom">
                            <p>User: {username}</p>
                            <p>Role: {userRole}</p>
                        </div>
                        <a href="/employee" className="dropdown-item">
                            <span>Setting</span>
                            <FiSettings className="icons" />
                        </a>
                        <a onClick={onLogOut} href="/" className="dropdown-item">
                            <span>Log out</span>
                            <FiLogOut className="icons" />
                        </a>
                    </div>
                </div>
            </div>
        </Box>
        <Box className="employee-title" style={{ display: isNavBarVisible() ? "none" : "" }}>
            <span>{t('employee.manager')}</span>
            <div className="align-right">
                <a className="employeeBtn" href="/employee">
                    <button onClick={changeTeamBtnStyle} className={styleEmployee} variant="contained">{t('employee.capital')}</button>
                </a>
                <Link className="teamBtn" to="/team">
                    <button onClick={changeEmployeeBtnStyle} className={styleTeam} variant="contained">{t('team.capital')}</button>
                </Link>
                {/* <Link className="teamBtn" to="/admin">
                    <button className={styleTeam} variant="contained">Admin</button>
                </Link> */}
                <div className="language-selector">
                    <Select
                        value={i18n.language}
                        onChange={handleLanguageChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        className="language-selector"
                    >
                        <MenuItem className="menu-item" value="en"> English
                        </MenuItem>
                        <MenuItem value="vi">Việt Nam
                        </MenuItem>

                    </Select>

                </div>
            </div>
        </Box>
        </>
    );
};

export default NavigateBar;