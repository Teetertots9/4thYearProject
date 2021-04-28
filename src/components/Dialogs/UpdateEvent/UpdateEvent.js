/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import MomentUtils from '@date-io/moment';
import { makeStyles } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider, KeyboardDateTimePicker } from '@material-ui/pickers';
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

function UpdateEvent({
    open, handleClose, onSubmit, isFullScreen, user, event
}){
    const classes = useStyles();
    const { createdBy, createdAt, updatedAt,} = event;
    const [eventDescription, setEventDescription ] = useState(event.eventDescription); 
    const {name, address} = user.attributes;
    const startDate = new Date(event.eventDateTime);
    const disableDate = new Date();
    const gracePeriod = 0;
    disableDate.setDate(disableDate.getDate() + gracePeriod);
    startDate.setDate(startDate.getDate() + gracePeriod);
    const [eventDateTime, setEventDateTime ] = useState(event.eventDateTime);
    const [isDateSelectorOpen, setDateSelectorOpen] = useState(false);


    const handleSubmit = () => {
        const updateEvent = {
            createdBy, 
            createdAt, 
            updatedAt,
            venueName: name,
            venueLocation: address,
            eventDateTime,
            eventImage: user.attributes["custom:user_image"],
            sortDate: eventDateTime,
            eventDescription,
            applications: []
        };
        onSubmit(updateEvent, event.eventId);
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
            <DialogTitle>Update Event</DialogTitle>
            <DialogContent>
            <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="flex-end">
                <Grid item xs={12}>
                {/* <MuiPickersUtilsProvider utils={MomentUtils}>
                    <KeyboardDateTimePicker
                      required
                      variant="inline"
                      inputVariant="outlined"
                      id="date-picker-inline"
                      label="Event Date Time"
                      value={eventDateTime}
                      onChange={handleDateChange}
                      onClick={openDatePicker}
                      open={isDateSelectorOpen}
                      onClose={closeDatePicker}
                      fullWidth
                      shouldDisableDate={disablePrevDates(disableDate)}
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
                <Button variant="contained" className={classes.button} onClick={handleSubmit}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}

UpdateEvent.defaultProps = {
    eventDateTime: "",
    eventDescription: "",
}

export default UpdateEvent;