import React, { useState, useEffect } from 'react';
import { Box, Grid, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';

import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useAddWorkdate, useGetWorkdate } from "../../../api/Workdate/useWorkdate";
import { useParams } from 'react-router';

const DetailWorkingAdd = (props) => {

    const dialogTitleStyle = {
        backgroundColor: '#4e54ed',
        color: 'white'
    }

    //Workdate có field employeeID trùng với employeeid hiện tại
    const [filteredWorkdate, setFilterdWorkdate] = useState([]);

    //Sử dụng add workdate api
    const addWorkdate = useAddWorkdate();

    //Get workdate data
    const { data } = useGetWorkdate();

    //Get employeeID from params
    const { employeeid } = useParams();


    const [date, setDate] = useState("");
    const [hour, setHour] = useState(1);
    const [error, setError] = useState('');
    const [error2, setError2] = useState('');
    const [employeeStartDate, setEmployeeStartDate] = useState('');

    //Truy vấn workdate[] có employeeID trùng với employeeid hiện tại
    useEffect(() => {
        if (data) {
            const filtered = data.filter(workdate => workdate.employeeID === parseInt(employeeid));
            setFilterdWorkdate(filtered)
        }
    }, [data, employeeid])


    //Validation
    useEffect(() => {
        const formattedDate = dayjs(date).format('DD-MM-YYYY');
        let dateOfWork = formattedDate;
        if (filteredWorkdate.some(workdate => workdate.dateOfWork === dateOfWork)) {
            setError(`Date ${formattedDate} already exists`);
        } else {
            setError(``);
        }
        if (hour > 10) {
            setError2(`Hour must not be higher than 10`);
        } else {
            setError2('');
        }
    }, [date, filteredWorkdate, hour])

    //Set startDate và convert về dateObject cho DatePicker
    useEffect(() => {
        const startDateObject = dayjs(props.data.startDate, 'DD-MM-YYYY');
        setEmployeeStartDate(startDateObject);
    }, [props.data.startDate])

    //Lấy cuối tuần
    const isWeekend = (date) => {
        const day = date.day();

        return day === 0 || day === 6;
    };

    // Open/Close Dialog
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    //--------------------------------------

    const onHourChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setHour(e.target.value);
        }
    }

    const onAddWorkdate = async (workdate, employeeid) => {
        await addWorkdate.mutateAsync({ workdate, employeeid });
    }

    //Thêm workdate
    const onSubmitWorkdateClicked = () => {
        if (date && hour) {

            //Format date value sang DD-MM-YYYY
            const formattedDate = dayjs(date).format('DD-MM-YYYY');
            let dateOfWork = formattedDate;
            if (filteredWorkdate.some(workdate => workdate.dateOfWork === dateOfWork)) {
                setError(`Date ${dateOfWork} already exists`);
                return
            }
            if (hour > 10) {
                setError2(`Hour must not be higher than 10`);
                return
            }
            if (hour === '') {
                setError(`Please fill all the form`);
                return
            }

            onAddWorkdate({
                dateOfWork,
                hour
            }, employeeid)
            setHour(1)
            setDate('')
            handleClose();

        }
        setError(`Please fill all the form`);
    }
    //----------------------------------------------

    return (
        <div>
            <Box>
                <IconButton onClick={handleClickOpen} style={{ display: props.isUserAllow() ? "none" : "" }}>
                    <AddCircleIcon style={{ color: "black" }} />
                </IconButton>
                <Dialog fullWidth={true} open={open} onClose={handleClose}>
                    <DialogTitle style={dialogTitleStyle}>Add New Workday</DialogTitle>
                    <DialogContent style={{
                        paddingTop: '16px',
                        paddingBottom: '16px'
                    }}>
                        {error && <p style={{ color: 'red' }}>+ {error}</p>}
                        {error2 && <p style={{ color: 'red' }}>+ {error2}</p>}
                        <Box sx={{ flexGrow: 1, height: 'fit-content' }}>
                            <Grid container spacing={1} rowSpacing={5}>
                                <Grid item xs={6}>
                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                        <DatePicker
                                            label="Working day"
                                            value={date}
                                            onChange={(date) => setDate(date)}
                                            disableFuture={true}
                                            format="DD-MM-YYYY"
                                            shouldDisableDate={isWeekend}
                                            minDate={employeeStartDate}
                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        onChange={onHourChange}
                                        value={hour}
                                        required
                                        id="hour"
                                        label="Hour"
                                        variant='outlined'
                                        fullWidth={true}
                                        error={hour > 10}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>CANCEL</Button>
                        <Button onClick={onSubmitWorkdateClicked}>SUBMIT</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
};

export default DetailWorkingAdd;