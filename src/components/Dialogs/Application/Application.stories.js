import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import ApplicationDialog from './Application';


export const props = {
    open: true,
    handleClose: () => { },
    onSubmit: (values) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
        }, 400);
    },
    isFullScreen: true,
    application: {
        artistName: "Joan Jett",
        applicationHook: "Hi I'm the lead singer of the band Joan Jett and the Blackhearts. I feel that my band would be perfect for you're event.",
        applicationImg: "https://upload.wikimedia.org/wikipedia/commons/5/50/Joan_Jett_2013.jpg"
    }
};

storiesOf('Dialogs/Application', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <ApplicationDialog {...props} />
    ));

