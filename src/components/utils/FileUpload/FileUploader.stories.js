import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import FileUploader from './FileUploader';

export const props = {
  handleChange: () => {},
};

storiesOf('Forms/FileUploader', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <FileUploader {...props} />
  ));