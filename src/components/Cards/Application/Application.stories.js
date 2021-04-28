import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Application from './Application'


export const props = {
    acceptApplication: () => {
        setTimeout(() => {
            alert("Accepted Application");
        }, 400);
    },
    application: {
        artistName: "Joan Jett",
        applicationHook: "Hi I'm the lead singer of the band Joan Jett and the Blackhearts. I feel that my band would be perfect for you're event.",
        artistImage: "https://upload.wikimedia.org/wikipedia/commons/5/50/Joan_Jett_2013.jpg"
    }
};

storiesOf('Cards/Application', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <Application {...props} />
    ));

