import React, { useEffect, useState } from 'react';
import { Box, MenuItem, FormControl, Select } from '@mui/material'
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import PaidIcon from '@mui/icons-material/Paid';
import './DetailStatistic.css'

import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useTranslation } from 'react-i18next';

const DetailStatistic = (props) => {


    const { t } = useTranslation();

    const panelHeadStyle = {
        height: 'fit-content',
        display: 'flex',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '21px',
        marginBottom: "16px"
    }
    const date = new Date();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const [workdates, setWorkdates] = useState(props.data.workdate);
    const [advances, setAdvances] = useState(props.data.advance);
    const [currentMonth, setCurrentMonth] = useState(month);
    const [currentYear, setCurrentYear] = useState(year);

    const [tempYear, setTempYear] = useState(dayjs());
    //-------------------------
    //Cập nhật workdate và advance
    useEffect(() => {
        setWorkdates(props.data.workdate);
        setAdvances(props.data.advance);
    }, [props.data.workdate, props.data.advance])


    //Format giá trị từ datepicker => YYYY 
    useEffect(() => {
        const yearFormat = dayjs(tempYear).format('YYYY')
        const convertYearToInt = parseInt(yearFormat)
        setCurrentYear(convertYearToInt);
    }, [tempYear, currentYear])

    //--------------------------------------------------
    //Tính hour dựa trên tháng hiện tại
    //Trả về danh sách các giá trị hour của ngày trong tháng đó  vd: [6,7,8]
    const getMonthHour = workdates.reduce((acc, work) => {
        const date = work.dateOfWork.split("-"); // Tách ngày, tháng, năm từ chuỗi ngày làm việc ex:[12,04,2023]
        const monthOfWorks = parseInt(date[1]); //Lấy danh sách tháng, ex: lấy từ vị trí [1] là 04 => 4
        const yearOfWorks = parseInt(date[2]);

        if (monthOfWorks === currentMonth && yearOfWorks === currentYear) {
            acc.push(work.hour); //Thêm [hour] có tháng trong field dateOfWork trùng vói tháng hiện tại vào mảng acc
        }
        return acc //trả về danh sách acc
    }, [])

    //Kết quả tổng các hour
    const totalMonthHour = getMonthHour.reduce((acc, hour) => {
        return acc + hour
    }, 0)

    //----------------------------------------------

    //Tính money của advance dựa trên tháng hiện tại
    //
    const getMonthAdvance = advances.reduce((acc, advance) => {
        const date = advance.dateGetAdvance.split("-");
        const monthOfWorks = parseInt(date[1]);
        const yearOfWorks = parseInt(date[2]);

        if (monthOfWorks === currentMonth && yearOfWorks === currentYear) {
            acc.push(advance.money);
        }
        return acc

    }, [])

    //Kết quả advance
    const totalMonthAdvance = getMonthAdvance.reduce((acc, advance) => {
        return acc + advance
    }, 0)

    //---------------------------------------------

    const onMonthChange = (e) => {
        setCurrentMonth(e.target.value);
    }

    return (
        <div>
            <div style={panelHeadStyle}>
                <div style={{ width: "100%" }}>
                    <FormControl variant="outlined" sx={{ float: "right", width: "20%", marginTop: "0px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                                label={t('year')}
                                value={tempYear}
                                onChange={(tempYear) => setTempYear(tempYear)}
                                disableFuture={true}
                                format="YYYY"
                                views={['year']}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <FormControl variant="outlined" sx={{ float: "right", width: "30%", marginTop: "0px", marginRight: "1rem" }}>
                        <Select
                            style={{ left: "-15px", width: "106%",textTransform:"capitalize" }}
                            value={currentMonth}
                            onChange={onMonthChange}
                        >
                            <MenuItem value={1}>{t('january')}</MenuItem>
                            <MenuItem value={2}>{t('feburary')}</MenuItem>
                            <MenuItem value={3}>{t('march')}</MenuItem>
                            <MenuItem value={4}>{t('april')}</MenuItem>
                            <MenuItem value={5}>{t('may')}</MenuItem>
                            <MenuItem value={6}>{t('june')}</MenuItem>
                            <MenuItem value={7}>{t('july')}</MenuItem>
                            <MenuItem value={8}>{t('august')}</MenuItem>
                            <MenuItem value={9}>{t('september')}</MenuItem>
                            <MenuItem value={10}>{t('octorber')}</MenuItem>
                            <MenuItem value={11}>{t('november')}</MenuItem>
                            <MenuItem value={12}>{t('december')}</MenuItem>
                        </Select>
                    </FormControl>

                </div>
            </div>
            <div style={{
                display: 'flex',
                justifyContent: "space-between"
            }}>
                <Box className="statistic--container">
                    <div className="summary">
                        <h3 style={{ textTransform: "uppercase" }}>{t('detail.statistic')}</h3>
                    </div>
                    <div className="statistic--panel">
                        <div className="statistic--body">
                            <AccessTimeFilledIcon style={{
                                color: "blue",
                                fontSize: "32px"
                            }} />
                            <div className="statistic--value">{getMonthHour.length}</div>
                            <div className="statistic--title">{t('detail.statistic.workingday')}</div>

                        </div>
                    </div>
                    <div className="statistic--panel">
                        <div className="statistic--body">
                            <PaidIcon style={{
                                color: "green",
                                fontSize: "32px"
                            }} />
                            <div className="statistic--value">{totalMonthHour * props.data.moneyPerHour}$</div>
                            <div className="statistic--title">{t('detail.statistic.totalsallary')}</div>

                        </div>
                    </div>
                    <div className="statistic--panel">
                        <div className="statistic--body">
                            <PriceChangeIcon style={{
                                color: "purple",
                                fontSize: "32px"
                            }} />
                            <div className="statistic--value">{totalMonthAdvance}$</div>
                            <div className="statistic--title">{t('detail.statistic.totaladvance')}</div>

                        </div>
                    </div>

                </Box>
                <Box className="summary--container">
                    <div className="summary">
                        <h3>{t('detail.statistic.summarymonth')}</h3>
                    </div>
                    <div className="smmary-body">
                        <div className="summary-content">
                            {t('detail.statistic.workingdayinmonth')}
                            <p>{getMonthHour.length} {getMonthHour.length > 1 ? `${t('detail.statistic.day.many')}` : `${t('detail.statistic.day.few')}`}</p>
                        </div>
                        <div className="summary-content">
                            {t('detail.statistic.totalsallary')}:
                            <p>{totalMonthHour * props.data.moneyPerHour}$</p>
                        </div>
                        <div className="summary-content">
                            {t('detail.statistic.totaladvance')}:
                            <p>{totalMonthAdvance}$</p>
                        </div>
                        <div className="summary-content">
                            {t('detail.statistic.totalsallarymonth')}:
                            <p>{totalMonthHour * props.data.moneyPerHour - totalMonthAdvance}$</p>
                        </div>
                    </div>
                </Box>
            </div>
        </div>
    );
};

export default DetailStatistic;
