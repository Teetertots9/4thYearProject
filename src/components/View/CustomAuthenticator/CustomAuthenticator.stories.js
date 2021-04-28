import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import CustomAuthenticator from './CustomAuthenticator';

storiesOf('View/Auth', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <CustomAuthenticator/>
    ));

