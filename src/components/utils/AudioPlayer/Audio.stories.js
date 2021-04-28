import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import Audio from './Audio';
import song from './song.mp3';

export const props = {
    source: song,
    name: "My Only Chance",
    artist: "The Toxic Avenger"
};

storiesOf('Util/Audio', module)
    .addDecorator(withKnobs)
    .add('Default', () => (
        <Audio {...props} />
    ));

