import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import EventList from './Event';


export const props = {
    events: [
        {
            venueName: "Whelans Pub",
            eventDateTime: "20 December 2020 19:00pm",
            eventDescription: "Need a band to play at the necessary date and time, preferably an indie band that plays music for all types of people.",
            venueLocation: "25 Wexford St, Saint Peter's, Dublin 2",
            eventImage: "https://www.dublintown.ie/wp-content/uploads/2012/03/whelans-1024x514.jpg"
        },
        {
            venueName: "Whelans Pub",
            eventDateTime: "20 December 2020 19:00pm",
            eventDescription: "Need a band to play at the necessary date and time, preferably an indie band that plays music for all types of people.",
            venueLocation: "25 Wexford St, Saint Peter's, Dublin 2",
            eventImage: "https://www.dublintown.ie/wp-content/uploads/2012/03/whelans-1024x514.jpg"
        },
        {
            venueName: "Whelans Pub",
            eventDateTime: "20 December 2020 19:00pm",
            eventDescription: "Need a band to play at the necessary date and time, preferably an indie band that plays music for all types of people.",
            venueLocation: "25 Wexford St, Saint Peter's, Dublin 2",
            eventImage: "https://www.dublintown.ie/wp-content/uploads/2012/03/whelans-1024x514.jpg"
        }
    ],
    applications: [
        {
            artistName: "Joan Jett",
            applicationHook: "Hi I'm the lead singer of the band Joan Jett and the Blackhearts. I feel that my band would be perfect for you're event.",
            applicationImg: "https://upload.wikimedia.org/wikipedia/commons/5/50/Joan_Jett_2013.jpg"
        },
        {
            artistName: "Joan Jett",
            applicationHook: "Hi I'm the lead singer of the band Joan Jett and the Blackhearts. I feel that my band would be perfect for you're event.",
            applicationImg: "https://upload.wikimedia.org/wikipedia/commons/5/50/Joan_Jett_2013.jpg"
        },
        {
            artistName: "Joan Jett",
            applicationHook: "Hi I'm the lead singer of the band Joan Jett and the Blackhearts. I feel that my band would be perfect for you're event.",
            applicationImg: "https://upload.wikimedia.org/wikipedia/commons/5/50/Joan_Jett_2013.jpg"
        },
        {
            artistName: "Joan Jett",
            applicationHook: "Hi I'm the lead singer of the band Joan Jett and the Blackhearts. I feel that my band would be perfect for you're event.",
            applicationImg: "https://upload.wikimedia.org/wikipedia/commons/5/50/Joan_Jett_2013.jpg"
        },
    ],
    createApplication: (values) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
        }, 400);
    },
    acceptApplication: () => { },
    user: {
        attributes: {'custom:user_type' : 'venue'}
    }
};

storiesOf('Lists/EventList', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <EventList {...props} />
    ));

