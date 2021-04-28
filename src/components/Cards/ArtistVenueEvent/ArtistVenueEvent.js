import React from 'react';
import { Card, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button} from '@material-ui/core';

function EventCard({event}) {
    const { eventImage, eventDateTime, eventDescription, venueLocation, artistName, venueName } = event;

    const artistRender = () => {
        if(artistName){
            return(
                <React.Fragment>
                    Artist Name: {artistName}<br/>
                </React.Fragment>
            );
        }
        return(
            <React.Fragment>
                Event Description: {eventDescription} <br/>
            </React.Fragment>
        )
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
                        Venue Name: {venueName} <br/>
                        Event Date and Time: {eventDateTime}<br/>
                        Venue Location: {venueLocation} <br/>
                        {artistRender()}
                    </Typography>
                </CardContent>
                <CardActionArea>
                    <CardActions>
                        <Button disabled>Get Ticket</Button>
                    </CardActions>
                </CardActionArea>
            </Card>

        </React.Fragment>
    );
}

export default EventCard;