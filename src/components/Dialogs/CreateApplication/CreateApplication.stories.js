import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import CreateApplication from './CreateApplication';


export const props = {
    open: true,
    handleClose: () => { },
    onSubmit: (values) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
        }, 400);
    },
    isFullScreen: true,
    user: {
        attributes: {
            name: "Sarah",
            "custom:user_image": "",
        }
    },
    event: {
        venueName: "Whelans Pub",
        eventDateTime: "20 December 2020 19:00pm"
    }
};

storiesOf('Dialogs/CreateApplication', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <CreateApplication {...props} />
    ));

