import React, { useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Typography, Avatar, Button} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import ViewEvents from '../Events/Events';
import UpdateUser from '../../Dialogs/UpdateUser/UpdateUser';

const useStyles = makeStyles(theme => ({
    avatar: {
      width: 100,
      height: 100,
      marginBottom: theme.spacing(3)
    },
    avatarIcon: {
      width: '80%',
      height: '80%'
    },
    padding: {
      padding: theme.spacing(2, 3),
    },
    formContent: {
      padding: theme.spacing(3),
    },
    avatarContent: {
      padding: theme.spacing(3),
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column'
    },
    input: {
      display: 'none',
    },
    label: {
      width: '100%',
    },
    button: {
      margin: 5,
      backgroundColor: "#FAA653"
  }
  }));

function UserProfile ({user, handleAcceptApplication, handleUpdateUserDetails, 
    handleUpdateEvent, handleUpdateApplication, userEvents}) {
    const [updateUserOpen, setUpdateUserOpen] = useState(false);
    const {name} = user.attributes;
    const userPicture = user.attributes['custom:user_image'];
    const classes = useStyles();

    const openUpdate = () => {setUpdateUserOpen(true);}
    const closeUpdate = () => {setUpdateUserOpen(false);}

    const handleUpdateUser = (attributes, picture, changedPicture) => {
      handleUpdateUserDetails(attributes, picture, changedPicture);
      closeUpdate();
    }

    return(
        <Grid container spacing={3}>
          <Grid item xs={12} xl={12} className={classes.avatarContent}>
                    <Avatar aria-label={name} src={userPicture} className={classes.avatar}/>
                    <Typography variant="h5" component="h5" gutterBottom>
                      {name}
                    </Typography>
                    <Button className={classes.button} onClick={openUpdate} variant="contained">Update Details</Button>
                    <Typography variant="h5" component="h5" gutterBottom>
                        Your Events
                    </Typography>
                    <ViewEvents
                      user={user}
                      events={userEvents}
                      handleAcceptApplication={handleAcceptApplication}
                      handleUpdateApplication={handleUpdateApplication}
                      handleUpdateEvent={handleUpdateEvent}/>
                    <UpdateUser
                      handleUpdateUser={handleUpdateUser}
                      user={user}
                      open={updateUserOpen}
                      handleClose={closeUpdate}/>
              </Grid>
        </Grid>)
    
}

export default UserProfile;