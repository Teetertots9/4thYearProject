import React from 'react';
import { Grid } from '@material-ui/core';
import AdminEventCard from '../../../Cards/Admin/Event/Event';

function AdminEventList({handleDeleteEvent, events}){

  const renderEventCard = (events) => {
    if(events){
      return (
        <Grid container spacing={1}>
          {events.map(event => {
              return (
                  <Grid item xs={12} lg={4} key={event.eventId}>
                  <AdminEventCard
                  event={event}
                  handleDeleteEvent={handleDeleteEvent}
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

export default AdminEventList;