import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button} from '@material-ui/core';
import AdminEventDialog from '../../../Dialogs/Admin/Event/Event';

/*eslint-disable-next-line*/
const moment = require('moment');
/*eslint-disable-next-line*/
require('moment/locale/en-ie');

function AdminEventCard({handleDeleteEvent, event}){
    const { createdAt, updatedAt, eventImage, eventId, eventDateTime, eventDescription, sortDate, venueLocation, artistName, venueName } = event;
    const [open, setOpen] = useState(false);
    const openDelete = () => setOpen(true);
    const close = () => setOpen(false);

    const artistRender = () => {
        if(artistName){
            return(
                <React.Fragment>
                    Artist Name: {artistName}<br/>
                </React.Fragment>
            );
        } else {
            return(
                <React.Fragment>
                    Event Description: {eventDescription} <br/>
                </React.Fragment>
            )
        }
    }

    return(
        <React.Fragment>
            <Card>
                <CardMedia
                component="img"
                image={eventImage}
                />
                <CardContent>
                    <Typography>
                        Event Id: {eventId}<br/>
                        Venue Name: {venueName} <br/>
                        Event Date and Time: {eventDateTime}<br/>
                        Sort Date: {sortDate}<br/>
                        Venue Location: {venueLocation} <br/>
                        {artistRender()}
                        Created At: {moment(createdAt).format('L')}<br/>
                        Updated At: {moment(updatedAt).format('L')}<br/>
                    </Typography>
                </CardContent>
                <CardActionArea>
                    <CardActions>
                        <Button onClick={openDelete}>Delete Event</Button>
                    </CardActions>
                </CardActionArea>
            </Card>
            <AdminEventDialog
            open={open}
            handleClose={close}
            handleDeleteEvent={handleDeleteEvent}
            event={event}/>
        </React.Fragment>
    );
}

export default AdminEventCard;