/* eslint react/prop-types: 0 */
import React from 'react';
import EventsList from '../../Lists/Event/Event';

function ViewEvents({user, events, handleAcceptApplication, handleCreateApplication, handleUpdateApplication, handleUpdateEvent}) {

    return(
        <React.Fragment>
            <EventsList
            events={events}
            createApplication={handleCreateApplication}
            acceptApplication={handleAcceptApplication}
            updateApplication={handleUpdateApplication}
            updateEvent={handleUpdateEvent}
            user={user}
            />        
        </React.Fragment>
    );
}

export default ViewEvents;