/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';
import { TextField, DialogContent, DialogActions, DialogTitle, Dialog, Button, Grid} from '@material-ui/core';

/*eslint-disable-next-line*/
const moment = require('moment');
/*eslint-disable-next-line*/
require('moment/locale/en-ie');

const useStyles = makeStyles({
    button: {
      margin: 5,
      backgroundColor: "#FAA653"
  }
});

function CreateEvent({
    open, handleClose, onSubmit, isFullScreen, user
}){
    const classes = useStyles();
    const [eventDescription, setEventDescription ] = useState(""); 
    const {name, address} = user.attributes;
    const startDate = new Date();
    const disableDate = new Date();
    const gracePeriod = 0;
    disableDate.setDate(startDate.getDate() + gracePeriod);
    startDate.setDate(startDate.getDate() + 1 + gracePeriod);
    const [eventDateTime, setEventDateTime ] = useState("");
    const [isDateSelectorOpen, setDateSelectorOpen] = useState(false);

    const resetEvent = () => {
        setEventDateTime(moment(startDate).format());
        setEventDescription("");
    }

    const handleSubmit = () => {
        const newEvent = {
            venueName: name,
            venueLocation: address,
            eventDateTime,
            sortDate : eventDateTime,
            eventDescription,
            createdBy: user.username,
            eventImage: user.attributes["custom:user_image"]
        };
        onSubmit(newEvent);
        resetEvent();
        handleClose();
    };

    const handleDateChange = (date) => {
        setEventDateTime(date);
      };

      const openDatePicker = () => {
        setDateSelectorOpen(true);
      };

      const closeDatePicker = () => {
        setDateSelectorOpen(false);
      };

      const disablePrevDates = (sDate) => {
        const startSeconds = Date.parse(sDate);
        return (date) => Date.parse(date) < startSeconds;
      };

    return(
        <Dialog
        isFullScreen={isFullScreen || false}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>Create Event</DialogTitle>
            <DialogContent>
            <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="flex-end">
                <Grid item xs={12}>
                {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DateTimePicker 
                      value={eventDateTime}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider> */}
                  <TextField
                  required
                  fullWidth
                  label="Date + Time"
                  value={eventDateTime}
                  onChange={(e) => setEventDateTime(e.target.value)}
                  variant="outlined"/>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    multiline
                    rows="4"
                    label="Description"
                    value={eventDescription}
                    onChange={(e) => setEventDescription(e.target.value)}
                    variant="outlined"
                    inputProps={{ maxLength: 100}}
                />
                
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button className={classes.button} onClick={handleSubmit}>Create Event</Button>
            </DialogActions>
        </Dialog>
    );
}

CreateEvent.defaultProps = {
    eventDateTime: "",
    eventDescription: "",
}

export default CreateEvent;