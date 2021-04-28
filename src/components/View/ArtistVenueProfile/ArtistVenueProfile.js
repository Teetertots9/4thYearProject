import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Grid, Typography, Avatar, Button} from '@material-ui/core';
import EventList from '../../Lists/ArtistVenueEvent/ArtistVenueEvent';

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
  }));

function ArtistVenueProfile({user, userProfile, handleFollowUser, events}){
    const classes = useStyles();
    const [isFollow, setFollow] = useState(userProfile.isFollowing);

    const follow = (user, userProfile) => {
      setFollow(true);
      handleFollowUser(user, userProfile);
    }

    const unFollow = (user, userProfile) => {
      setFollow(false);
      handleFollowUser(user, userProfile);
    }


    const renderProfile = (user, userProfile) => {
        if(userProfile.userType === "artist") {
            return(
                <React.Fragment>
                    <Avatar aria-label={userProfile.artistName} src={userProfile.userPicture} className={classes.avatar} />
                    <Typography variant="h5" component="h5" gutterBottom>
                    {userProfile.artistName}
                    </Typography>
                    {isFollow ? <Button variant="contained" onClick={() => unFollow(user, userProfile)}><Typography>UnFollow Artist</Typography></Button> : <Button variant="contained" onClick={() => follow(user, userProfile)}><Typography>Follow Artist</Typography></Button>}
                    <Typography variant="h5" component="h5" gutterBottom>
                         Artist Past/Current Events
                    </Typography>
                    <EventList
                      events={events}/>
                </React.Fragment>
            );
        }
            return (
                <React.Fragment>
                    <Avatar aria-label={userProfile.venueName} src={userProfile.userPicture} className={classes.avatar} />
                    <Typography variant="h5" component="h5" gutterBottom>
                    {userProfile.venueName}
                    </Typography>
                    {isFollow ? (<Button variant="contained" onClick={() => unFollow(user, userProfile)}><Typography>UnFollow Venue</Typography></Button>) : (<Button variant="contained" onClick={() => follow(user, userProfile)}><Typography>Follow Venue</Typography></Button>)}
                    <Typography variant="h5" component="h5" gutterBottom>
                        Venue Past/Current Events
                    </Typography>
                    <EventList
                      events={events}/>
                </React.Fragment>
            );
    }

    return(
        <Grid container spacing={3}>
          <Grid item xs={12} xl={12} className={classes.avatarContent}>
            {renderProfile(user, userProfile)}        
            </Grid>
        </Grid>)
}

export default ArtistVenueProfile;