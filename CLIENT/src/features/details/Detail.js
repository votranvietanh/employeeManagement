import React, { useEffect, useState } from 'react';
import './detail.css'
import { Box, Grid, Tab, IconButton } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import DetailInformation from './DetailInformation/DetailInformation';
import DetailWorking from './DetailWorking/DetailWorking';
import DetailAdvance from './DetailAdvance/DetailAdvance';
import DetailStatistic from './DetailStatistic/DetailStatistic';
import { useParams } from 'react-router';
import { useGetEmployeeById, useDeleteEmployee, useDownloadImageFromFileSystem, useUpdateEmployeeImage } from '../../api/Employee/useEmployee';
import DetailEdit from './DetailEdit';
import DetailConfirmDialog from './DetailConfirmDialog';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';
import { selectUser } from '../user/userSlice';
import { FaCamera } from "react-icons/fa";


const Detail = () => {
    //style
    const btnGroup = (
        {
            marginLeft: 'auto',
            display: 'flex',
            marginTop: 'auto',
            marginBottom: 'auto'
        }
    )
    const tabpanelStyle = {
        padding: '16px 0'
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


    //Instance Chuyển đổi ngôn ngữ
    const { t } = useTranslation();

    //-----------------------------------------------------------
    const [file, setFile] = useState(null);

    const { employeeid } = useParams();
    const { data, isLoading, error } = useGetEmployeeById(employeeid);

    const [imageName, setImageName] = useState('');
    const { data: imageUrl } = useDownloadImageFromFileSystem(imageName, employeeid); //load thông hình ảnh


    //Using useUpdateEmployeeImage hook
    const updateEmployeeImage = useUpdateEmployeeImage();
    const onUpdateEmployeeImage = async (id, file) => {
        await updateEmployeeImage.mutateAsync({ id, file })
    }

    //-----------------------------------------------
    
    //Đổi hình ảnh của employee
    const onFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            onUpdateEmployeeImage(employeeid, file)
            setFile(file);
        }
    };

    //---------------------------------------------
    //load imageName first
    useEffect(() => {
        if (data && data.imageName) {
            setImageName(data.imageName);
        }
    }, [data]);

    const [tab, setTab] = React.useState('information');

    //Delete a Employee
    const deleteEmployee = useDeleteEmployee();
    const onDeleteEmployee = async (id) => {
        await deleteEmployee.mutateAsync(id);
    }


    const handleTabChange = (event, newValue) => {
        setTab(newValue);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <>
        <Box className="employee-option">
            <p>{data.fullName}</p>
            <div style={btnGroup}>
                <DetailEdit data={data} isUserAllow={isUserAllow} />
                <div>
                    <DetailConfirmDialog data={data} onDeleteEmployee={onDeleteEmployee} isUserAllow={isUserAllow} />
                </div>
            </div>
        </Box>
        <Box sx={{ flexGrow: 1, height: 'fit-content' }}>
            <Grid container spacing={1} rowSpacing={5}>
                <Grid item xs={3}>
                    <div>
                        <img className="image" alt="profile-img" href="" src={imageUrl} />
                        <label className="upload-image" htmlFor="upload-photo">
                            <input
                                style={{ display: 'none' }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                onChange={onFileChange}
                            />
                            <IconButton className="upload-btn" variant="contained" component="span">
                                <FaCamera />
                            </IconButton>
                        </label>
                    </div>
                    <div className="profile-label">
                        <div className="profile-label--first-row">
                            <div className="profile-label-no">No: {data.employeeID}</div>
                            <div className="profile-label-age">{t('detail.age')}: {data.age}</div>
                        </div>
                        <div className="profile-label--second-row">
                            <div className="profile-label-sex">{t('detail.sex')}: {data.sex ? `${t('detail.sex.male')}` : `${t('detail.sex.female')}`}</div>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={9}>
                    <Box sx={{ width: '100%' }}>
                        <TabContext value={tab}>
                            <Box>
                                <TabList onChange={handleTabChange}>
                                    <Tab value="information" label="INFORMATIONS" />
                                    <Tab value="working" label="WORKING" />
                                    <Tab value="advance" label="ADVANCES" />
                                    <Tab value="statistic" label="STATISTIC" />
                                </TabList>
                            </Box>
                            <TabPanel style={tabpanelStyle} value="information"><DetailInformation data={data} isUserAllow={isUserAllow} /></TabPanel>
                            <TabPanel style={tabpanelStyle} value="working"><DetailWorking data={data} isUserAllow={isUserAllow} /></TabPanel>
                            <TabPanel style={tabpanelStyle} value="advance"><DetailAdvance data={data} isUserAllow={isUserAllow} /></TabPanel>
                            <TabPanel style={tabpanelStyle} value="statistic"><DetailStatistic data={data} isUserAllow={isUserAllow} /></TabPanel>
                        </TabContext>

                    </Box>
                </Grid>
            </Grid>
        </Box>
        </>
    );
};

export default Detail;