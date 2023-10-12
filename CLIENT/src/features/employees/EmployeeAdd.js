import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { Box, Grid, TextField, Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import dayjs from 'dayjs'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useGetPosition } from '../../api/Position/usePosition';
import { useGetTeam } from '../../api/Team/useTeam';
import { FaPlusCircle } from "react-icons/fa";
import "./Employee.css";



const EmployeeAdd = (props) => {
    const dialogTitleStyle = {
        backgroundColor: '#4e54ed',
        color: 'white'
    }


    const selectLabelStyle = {
        left: "-15px",
    }

    //-------------------------------------------------

    //Getting employee Input
    const { data: positionData } = useGetPosition();
    const { data: teamData } = useGetTeam();


    const [error, setError] = useState('');
    const [date, setDate] = useState('');
    const [fullName, setFullName] = useState('')
    const [address, setAddress] = useState('')
    const [age, setAge] = useState(1)
    const [moneyPerHour, setMoneyPerHour] = useState(1)
    const [phone, setPhone] = useState('')
    const [sex, setSex] = useState(true)
    const [team, setTeam] = useState('');
    const [position, setPosition] = useState('');

    const [selectedImage, setSelectedImage] = useState(null);
    const [file, setFile] = useState(null);

    //Format date value sang DD-MM-YYYY
    const formattedDate = dayjs(date).format('DD-MM-YYYY');
    let startDate = formattedDate;

    const onFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setSelectedImage(e.target.result);
        };

        if (file) {
            reader.readAsDataURL(file);
            setFile(file);
        }
    };


    const onSexChange = (e) => {
        setSex(e.target.value);
    }
    const onFullNameChange = (e) => {
        //uppercase chữ đầu tiên sau mỗi khoảng cách
        //các chữ còn lại đều lowercase
        const toCapitalize = str => str.replace(/(^\w|\s\w)(\S*)/g, (_, m1, m2) => m1.toUpperCase() + m2.toLowerCase())
        setFullName(toCapitalize(e.target.value));
    }
    const onAddressChange = (e) => {
        const regex = /^[a-zA-Z0-9\s/,]+$/;
        //uppercase chữ đầu tiên sau mỗi khoảng cách
        //các chữ còn lại được phép uppercase
        const toCapitalize = str => str.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
        if (e.target.value === "" || regex.test(e.target.value)) {
            setAddress(toCapitalize(e.target.value));
        }
    }
    const onAgeChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setAge(e.target.value);
        }
    }
    const onMoneyPerHourChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setMoneyPerHour(e.target.value);
        }
    }
    const onPhoneChange = (e) => {
        const regex = /^[0-9\b]+$/;
        if (e.target.value === "" || regex.test(e.target.value)) {
            setPhone(e.target.value);
        }
    }
    const onTeamChange = (e) => {
        setTeam(e.target.value);
    };
    const onPositionChange = (e) => {
        setPosition(e.target.value);
    }



    //-------------------------------------------------
    // Submit employee
    // const onSubmitEmployeeClicked = () => {
    //     if (!fullName || !address || !age || !moneyPerHour || !phone || !picture || sex === undefined || !position || !team || !date) {
    //         setError('Please fill in all required fields');
    //         return;
    //     }
    //     if (age > 60 || age < 18) {
    //         setError('Age cannot be greater than 60 or smaller than 18');
    //         return;
    //     }
    //     if (phone.length > 12 || phone.length < 8) {
    //         setError('Phone number is no longer than 12 and smaller than 8 characters');
    //         return;
    //     }
    //     setError('');
    //     props.onAddEmployee({
    //         fullName,
    //         address,
    //         age,
    //         moneyPerHour,
    //         phone,
    //         picture,
    //         sex,
    //         startDate,
    //     }, position, team);
    //     setFullName('')
    //     setAddress('')
    //     setAge(1)
    //     setMoneyPerHour(0)
    //     setPhone('')
    //     setPicture('')
    //     setSex(true)
    //     setPosition('')
    //     setTeam('')
    //     handleClose();
    // }

    // Submit employee with image
    const onSubmitEmployeeWithImageClicked = () => {
        if (!fullName || !address || !age || !moneyPerHour || !phone || sex === undefined || !position || !team || !date || !file) {
            setError('Please fill in all required fields');
            return;
        }
        if (age > 60 || age < 18) {
            setError('Age cannot be greater than 60 or smaller than 18');
            return;
        }
        if (phone.length > 12 || phone.length < 8) {
            setError('Phone number must be between 8 and 12 characters');
            return;
        }
        setError('');
        props.onAddEmployeeWithImage(
            {
                fullName,
                address,
                age,
                moneyPerHour,
                phone,
                sex,
                startDate,
            }, file, position, team
        );

        setFullName('');
        setAddress('');
        setAge(1);
        setMoneyPerHour(0);
        setPhone('');
        setSex(true);
        setPosition('');
        setTeam('');

        handleClose();

    };

    //-------------------------------------------------

    // Open/Close Dialog
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    //-------------------------------------------------
    //MenuItem Team for Select
    let teamSelect = null;
    if (teamData) {
        teamSelect = teamData.map((team) => (
            <MenuItem key={team.teamID} value={team.teamID}>
                {team.teamName}
            </MenuItem>
        ));
    }

    //MenuItem Position for Select
    let positionSelect = null;
    if (positionData) {
        positionSelect = positionData.map((position) => (
            <MenuItem key={position.positionID} value={position.positionID}>
                {position.positionName}
            </MenuItem>
        ));
    }
    return (
        <Box>
            <IconButton style={{ display: props.isUserAllow() ? "none" : "" }} onClick={handleClickOpen}>
                <FaPlusCircle className="datagrid-icon" style={{ color: "black" }} />
                <span className="icon-text">Add</span>
            </IconButton>
            <Dialog fullWidth={true} open={open} onClose={handleClose}>
                <DialogTitle style={dialogTitleStyle}>Add New Employee</DialogTitle>
                <DialogContent style={{
                    paddingTop: '16px',
                    paddingBottom: '16px'
                }}>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <Box sx={{ flexGrow: 1, height: 'fit-content' }}>
                        <Grid container spacing={3} rowSpacing={5}>
                            <Grid item xs={12}>
                                <TextField
                                    onChange={onFullNameChange}
                                    value={fullName}
                                    required
                                    id="fullName"
                                    label="Full name employee"
                                    variant='standard'
                                    fullWidth={true}
                                    error={fullName.length < 1}

                                />
                                <span style={{ float: 'right' }}>{fullName.length + '/255'}</span>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={onAddressChange}
                                    value={address}
                                    required
                                    id="address"
                                    label="Address"
                                    variant='standard'
                                    fullWidth={true}
                                    error={address.length < 1}
                                    helperText="Fill employee address"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl variant="standard" sx={{ m: 2, minWidth: "95%", marginTop: "0px" }}>
                                    <InputLabel style={selectLabelStyle}>
                                        Gender
                                    </InputLabel>
                                    <Select
                                        style={{ left: "-15px", width: "106%" }}
                                        value={sex}
                                        onChange={onSexChange}
                                    >
                                        <MenuItem value={true}>Male</MenuItem>
                                        <MenuItem value={false}>Female</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={onAgeChange}
                                    value={age}
                                    required
                                    id="age"
                                    label="Age"
                                    variant='standard'
                                    fullWidth={true}
                                    error={age > 60 || age < 18 || age.length < 1}
                                    helperText="Age must be higer than 18 or smaller than 60"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Start Date"
                                        value={date}
                                        onChange={(date) => setDate(date)}
                                        disableFuture={false}
                                        format="DD-MM-YYYY"
                                        componentsProps={{
                                            textField: { variant: 'standard', style: { width: "100%" } },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    onChange={onMoneyPerHourChange}
                                    value={moneyPerHour}
                                    required
                                    id="moneyPerHour"
                                    label="Money/Hour"
                                    variant='standard'
                                    fullWidth={true}
                                    error={moneyPerHour.length < 1}

                                />
                            </Grid>
                            {/* <Grid item xs={6}>
                                <TextField
                                    onChange={onPictureChange}
                                    value={picture}
                                    required
                                    id="picture"
                                    label="Profile picture"
                                    variant='standard'
                                    fullWidth={true}

                                />
                            </Grid> */}
                            <Grid item xs={6}>
                                <TextField
                                    onChange={onPhoneChange}
                                    value={phone}
                                    required
                                    id="phone"
                                    label="Phone Number"
                                    variant='standard'
                                    fullWidth={true}
                                    error={phone.length < 1 || phone.length > 12 || phone.length < 8}
                                    helperText="Phone number has 8 - 12 characters"
                                />
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl variant="standard" sx={{ m: 2, minWidth: "95%", marginTop: "0px" }}>
                                    <InputLabel style={selectLabelStyle}>
                                        Team
                                    </InputLabel>
                                    <Select
                                        style={{ left: "-15px", width: "106%" }}
                                        value={team}
                                        onChange={onTeamChange}
                                    >
                                        {teamSelect}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <FormControl variant="standard" sx={{ m: 2, minWidth: "95%", marginTop: "0px" }}>
                                    <InputLabel style={selectLabelStyle}>
                                        Position
                                    </InputLabel>
                                    <Select
                                        style={{ left: "-15px", width: "106%" }}
                                        value={position}
                                        onChange={onPositionChange}
                                    >
                                        {positionSelect}
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={6}>
                                <input
                                    type="file"
                                    id="file"
                                    accept="image/*"
                                    onChange={onFileChange}
                                />
                                {selectedImage && (
                                    <img src={selectedImage} alt="Selected" style={{ maxWidth: '100%' }} />
                                )}
                            </Grid>
                        </Grid>
                    </Box>


                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>CANCEL</Button>
                    {/* <Button onClick={onSubmitEmployeeClicked}>SUBMIT</Button> */}
                    <Button onClick={onSubmitEmployeeWithImageClicked}>SUBMIT</Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EmployeeAdd;