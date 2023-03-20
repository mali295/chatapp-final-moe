import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import FormControl from '@mui/material/FormControl';
import { addEvent, Events } from "../../../core/services/eventService";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { addAnnouncement } from '../../../core/services/announcementService';




export default function CreateAnnouncement(props) {

    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [creationDate, setcreationDate] = React.useState(new Date());


    const handleSubmit = (e) => {
        e.preventDefault();
        addAnnouncement({
            title,
            description,
            creationDate
        });
        console.log(Events);
        props.handleClose();
    };

    return (
        <div>
            <Dialog fullWidth={true}
                maxWidth={'xs'} onClose={props.handleClose} open={props.open}>
                <DialogTitle>Create Announcement</DialogTitle>
                <List sx={{ pt: 0 }}>
                    <ListItem>
                        <FormControl fullWidth>

                            <TextField
                                required
                                id="outlined-required"
                                label="Title"
                                defaultValue=""
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </FormControl>
                    </ListItem>

                    <ListItem>
                        <FormControl fullWidth>

                            <TextField
                                required
                                id="outlined-required"
                                label="Description"
                                defaultValue=""
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </FormControl>
                    </ListItem>


                    <ListItem>
                        <FormControl fullWidth>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DesktopDatePicker
                                    label="Date"
                                    inputFormat="MM/DD/YYYY"
                                    value={creationDate}
                                    onChange={(e) => {
                                        console.log(e);
                                        setcreationDate(e)
                                    }}
                                    disabled={props.creationDate ? true : false}
                                    renderInput={(params) => <TextField {...params} />}

                                />
                            </LocalizationProvider>
                        </FormControl>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" onClick={(e) => handleSubmit(e)}>Submit</Button>

                    </ListItem>
                </List>
            </Dialog>
        </div>
    );
}

CreateAnnouncement.propTypes = {
    handleClose: PropTypes.func.isRequired,
    handleOpen: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};