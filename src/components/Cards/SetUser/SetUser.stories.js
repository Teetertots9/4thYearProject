import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import SetUser from './SetUser';


export const props = {
    handleSetUserType: (attributes) => {
        setTimeout(() => {
            alert(JSON.stringify(attributes, null, 2));
        }, 400);
    },
};

storiesOf('Card/SetUser', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <SetUser {...props} />
    ));

