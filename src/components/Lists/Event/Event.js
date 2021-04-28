import React from 'react';
import { Grid } from '@material-ui/core';
import Event from '../../Cards/Event/Event';

function EventList({events, createApplication, acceptApplication, updateApplication, updateEvent, user}){

  const renderEventCard = (events) => {
    if(events){
      return (
        <Grid container spacing={1}>
          {events.map(event => {
              return (
                  <Grid item xs={12} lg={4} key={event.eventId}>
                  <Event
                  event={event}
                  createApplication={createApplication}
                  acceptApplication={acceptApplication}
                  updateApplication={updateApplication}
                  updateEvent={updateEvent}
                  user={user}
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