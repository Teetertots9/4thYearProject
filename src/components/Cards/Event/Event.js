/* eslint react/prop-types: 0 */
import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button} from '@material-ui/core';
import CreateApplication from '../../Dialogs/CreateApplication/CreateApplication';
import UpdateApplication from '../../Dialogs/UpdateApplication/UpdateApplication';
import UpdateEvent from '../../Dialogs/UpdateEvent/UpdateEvent';
import EventDialog from '../../Dialogs/Event/Event';

const useStyles = makeStyles({
      button: {
        margin: 5,
        backgroundColor: "#FAA653"
    }
  });

function Event({event, createApplication, acceptApplication, updateApplication, updateEvent, user}){

    const classes = useStyles();
    const { venueName, eventDateTime, eventDescription, venueLocation, artistName, eventImage} = event;
    const [application, setApplication] = useState();
    const [openApplication, setOpenApplication] = useState(false);
    const [openManage, setOpenManage] = useState(false);
    const [openUpdateEvent, setOpenUpdateE] = useState(false);
    const [openUpdateApplication, setOpenUpdateA ] = useState(false);
    const [hasApplied, setApplied] = useState(false); 

    useEffect(() => {
        if(event && event.applications){
            for (var i = 0; i < event.applications.length; i++) {
                if(user.username === event.applications[i].artistId){
                    setApplied(true);
                    setApplication(event.applications[i]);
                }
            }
        }
    },[]);

    const openApplyForm = () => setOpenApplication(true);
    const closeApplyForm = () => setOpenApplication(false);
    const openUpdateForm = () => {
        setOpenUpdateA(true);
    }
    const closeUpdateForm = () => setOpenUpdateA(false);

    const handleCreate = (newApplication, eventId) => {
        createApplication(newApplication, eventId);
        setApplied(true);
        closeApplyForm();
    }

    const renderButtons = (event) => {
        if(!event.artistName && user.attributes['custom:user_type'] === 'artist' && hasApplied === false){
            return(
                <Button variant="contained" className={classes.button} onClick={openApplyForm}>Apply</Button>
            )
        }
        else if(!event.artistName && user.attributes['custom:user_type'] === 'artist' && hasApplied === true){
            return(
                    <Button variant="contained" className={classes.button} onClick={openUpdateForm}>Update Application</Button>
            )
        }
        else if(!event.artistName && user.attributes['custom:user_type'] === 'venue'){
            return(
                <React.Fragment>
                    <Button variant="contained" className={classes.button} onClick={openManageDialog}>Manage Applications</Button>
                    <Button variant="contained" className={classes.button} onClick={openUpdateDialog}>Update Event</Button>
                </React.Fragment>
            )
        }
    }

    const openManageDialog = () => setOpenManage(true);
    const closeManage = () => setOpenManage(false);
    const openUpdateDialog = () => setOpenUpdateE(true);
    const closeUpdate = () => setOpenUpdateE(false);


    return(
        <React.Fragment>
        <Card variant="outlined">
            {eventImage ? (<CardMedia
                component="img"
                image={eventImage}
                title="venue"
                /> ) : null}
            <CardContent>
                <Typography>Venue: {venueName}</Typography>
                <Typography>Location: {venueLocation}</Typography>
                {artistName ? <Typography>Artist: {event.artistName}</Typography> : <Typography component="p">Description: <br/>{eventDescription}</Typography>}
                <Typography>Date & Time: {eventDateTime}</Typography>
            </CardContent>
            <CardActionArea>
            <CardActions>
                {renderButtons(event)}
                </CardActions>
            </CardActionArea>
        </Card>

        <CreateApplication
        open={openApplication}
        event={event}
        onSubmit={handleCreate}
        handleClose={closeApplyForm}
        user={user}
        />
        <EventDialog
        open={openManage}
        handleClose={closeManage}
        event={event}
        acceptApplication={acceptApplication}
        user={user}/>
        {application ? <UpdateApplication
        open={openUpdateApplication}
        handleClose={closeUpdateForm}
        onSubmit={updateApplication}
        event={event}
        application={application}
        user={user}/> : null}
        <UpdateEvent
        open={openUpdateEvent}
        handleClose={closeUpdate}
        onSubmit={updateEvent}
        event={event}
        user={user}/>
        </React.Fragment>
)
}

export default Event;