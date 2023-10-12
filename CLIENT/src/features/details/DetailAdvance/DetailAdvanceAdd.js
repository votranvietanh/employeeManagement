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
import { useAddAdvance } from "../../../api/Advance/useAdvance";
import { useParams } from 'react-router';

const DetailAdvanceAdd = (props) => {

    const dialogTitleStyle = {
        backgroundColor: '#4e54ed',
        color: 'white'
    }
    const addAdvance = useAddAdvance();
    const { employeeid } = useParams();
    const [date, setDate] = useState("");
    const [money, setMoney] = useState(1);
    const [error, setError] = useState('');
    const [employeeStartDate, setEmployeeStartDate] = useState(dayjs())

    //Format date value sang DD-MM-YYYY
    const formattedDate = dayjs(date).format('DD-MM-YYYY');
    let dateGetAdvance = formattedDate;
    // Open/Close Dialog
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    //Lấy startDate của Employee 
    useEffect(() => {
        const startDateObject = dayjs(props.data.startDate, 'DD-MM-YYYY');
        setEmployeeStartDate(startDateObject);
    }, [props.data.startDate])

    //Allow number only
    const onMoneyChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setMoney(e.target.value);
        }
    }

    //Sử dụng api thêm advance
    const onAddAdvance = async (advance, employeeID) => {
        await addAdvance.mutateAsync({ advance, employeeID });
    }

    //Thêm advance
    const onSubmitAdvanceClicked = () => {
        if (date && money) {
            if (money < 1) {
                setError('Money cannot be 0')
                return
            }
            onAddAdvance({
                dateGetAdvance,
                money
            }, employeeid)
            setMoney(1)
            setDate(dayjs(''))
            handleClose();
        }
        setError('Please fill all the form')
    }
    //----------------------------------------------
    useEffect(() => {
        if (date) {
            setError('')
        }
    }, [date])

    return (
        <div>
            <Box>
                <IconButton onClick={handleClickOpen} style={{ display: props.isUserAllow() ? "none" : "" }}>
                    <AddCircleIcon style={{ color: "black" }} />
                </IconButton>
                <Dialog fullWidth={true} open={open} onClose={handleClose}>
                    <DialogTitle style={dialogTitleStyle}>Add New Advance</DialogTitle>
                    <DialogContent style={{
                        paddingTop: '16px',
                        paddingBottom: '16px'
                    }}>
                        {error && <p style={{ color: 'red' }}>+ {error}</p>}
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
                                            minDate={employeeStartDate}

                                        />
                                    </LocalizationProvider>
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        onChange={onMoneyChange}
                                        value={money}
                                        required
                                        id="money"
                                        label="Money"
                                        variant='outlined'
                                        fullWidth={true}
                                        error={money === '' || money < 1}
                                    />
                                </Grid>
                            </Grid>
                        </Box>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>CANCEL</Button>
                        <Button onClick={onSubmitAdvanceClicked}>SUBMIT</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div>
    );
};

export default DetailAdvanceAdd;