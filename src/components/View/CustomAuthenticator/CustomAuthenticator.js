import React, { useState} from 'react';
import Amplify from 'aws-amplify';
import awsconfig from '../../../aws-exports';
import { AmplifyAuthenticator, AmplifySignUp } from '@aws-amplify/ui-react';
import {Button} from '@material-ui/core';
import SetUser from '../../Cards/SetUser/SetUser';
import userSignUp from '../../../functions/Authentication';
import { func } from 'prop-types';

Amplify.configure(awsconfig);

function CustomAuthenticator(){

  const [open, setOpen] = useState(false);
  const [attributes, setAttributes] = useState();

  const openSetUser = () => setOpen(true);

  const closeSetUser = () => setOpen(false);

  const handleSubmit = async (event) => {
    setTimeout(() => {
      alert(JSON.stringify(event, null, 2));
  }, 400);
    const {username, password, email, phone_number, name} = event;
    await userSignUp(username, password, email, phone_number, name, attributes);
  }

  const handleSetUserType = (attributes) => {
    setAttributes(attributes);
    closeSetUser();
  }

return (
  <React.Fragment>
    <Button onClick={openSetUser}>Set User Type</Button>
<SetUser 
  open={open}
  handleClose={closeSetUser}
  handleSetUserType={handleSetUserType}
/>
<AmplifyAuthenticator initialAuthState='signup'>
        <AmplifySignUp
          slot="sign-up"
          handleSubmit = {handleSubmit}
          formFields={[
            { type: "username" },
            { type: "password" },
            { type: "email" },
            { type: "phone_number"},
            { 
                type: "string",
                label: "Artist/Band or Venue Name",
                key: "name",
                required: true,
            },
          ]}
        />
        
</AmplifyAuthenticator>

        </React.Fragment>
);
}

export default CustomAuthenticator;