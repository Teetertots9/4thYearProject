import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import UserProfile from './UserProfile';
const props = {
    userEvents: [
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
    user : {attributes: {
        username: "allie",
        name: "alice",
        "custom:user_image": "",
    }},
    userProfile : {attributes: {
        username: "allie",
        name: "alice",
        "custom:user_image": "",
    }},
    handleUpdateUserDetails: (values, picture, changedPicture) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
        }, 400);
    },
};
storiesOf('View/Profile', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <UserProfile {...props}/>
    ));