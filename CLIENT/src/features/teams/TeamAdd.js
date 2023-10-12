import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useAddTeam } from '../../api/Team/useTeam';
import { Box, Grid, TextField } from '@mui/material'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

const TeamAdd = (props) => {

    const dialogTitleStyle = {
        backgroundColor: '#4e54ed',
        color: 'white'
    }
    //------------------------------------------------
    const addTeam = useAddTeam();
    const [teamName, setTeamName] = useState("");

    //------------------------------------------------
    const onAddTeam = async (team) => {
        await addTeam.mutateAsync(team);
    }

    const onSubmitTeamClicked = () => {
        if (teamName) {
            onAddTeam({
                teamName
            })
            setTeamName('')
            handleClose();
        }
    }
    const onTeamNameChange = (e) => {
        setTeamName(e.target.value);
    }
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

    return (
        <div>
            <Box>
                <IconButton onClick={handleClickOpen} style={{ display: props.isUserAllow() ? "none" : "" }}>
                    <AddCircleIcon />
                </IconButton>
                <Dialog fullWidth={true} open={open} onClose={handleClose}>
                    <DialogTitle style={dialogTitleStyle}>Add New Team</DialogTitle>
                    <DialogContent style={{
                        paddingTop: '16px',
                        paddingBottom: '16px'
                    }}>
                        <Box sx={{ flexGrow: 1, height: 'fit-content' }}>
                            <Grid container spacing={1} rowSpacing={5}>
                                <Grid item xs={12}>
                                    <TextField
                                        onChange={onTeamNameChange}
                                        value={teamName}
                                        required
                                        id="teamName"
                                        label="Team name"
                                        variant='standard'
                                        fullWidth={true}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>CANCEL</Button>
                        <Button onClick={onSubmitTeamClicked}>SUBMIT</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </div >
    );
};

export default TeamAdd;