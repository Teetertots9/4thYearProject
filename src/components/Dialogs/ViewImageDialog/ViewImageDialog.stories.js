import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

import ViewImageDialog from './ViewImageDialog';

export const props = {
  open: true,
  handleClose: () => console.log('Closing Image'),
  image: "https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg",
};

storiesOf('Dialogs/ViewImageDialog', module)
  .addDecorator(withKnobs)
  .add('default', () => (
    <ViewImageDialog {...props} />
  ));