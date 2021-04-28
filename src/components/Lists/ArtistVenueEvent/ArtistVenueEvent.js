import React from 'react';
import { Grid } from '@material-ui/core';
import EventCard from '../../Cards/ArtistVenueEvent/ArtistVenueEvent';

function EventList({events}){

  const renderEventCard = (events) => {
    if(events){
      return (
        <Grid container spacing={1}>
          {events.map(event => {
              return (
                  <Grid item xs={12} lg={4} key={event.eventId}>
                  <EventCard
                  event={event}
                />
                  </Grid>
                )
            })
          }
        </Grid>
      );
    }
  };

  return(
    <React.Fragment>
    {renderEventCard(events)}
    </React.Fragment>
  );
}

export default EventList;