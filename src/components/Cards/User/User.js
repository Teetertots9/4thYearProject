import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button} from '@material-ui/core';

const useStyles = makeStyles({
      button: {
        margin: 5,
        backgroundColor: "#FAA653"
    }
  });

function UserCard({user, userProfile, handleViewProfile, handleFollowUser}){
    const classes = useStyles();
    const { artistName, venueName, userPicture, venueLocation, isFollowing } = userProfile;
    const [isFollow, setFollow] = useState(isFollowing);

    const follow = (user, userProfile) => {
        setFollow(true);
        handleFollowUser(user, userProfile);
      }
  
      const unFollow = (user, userProfile) => {
        setFollow(false);
        handleFollowUser(user, userProfile);
      }

    const artistRender = () => {
        if(artistName){
            return(
                <React.Fragment>
                    Artist Name: {artistName}<br/>
                </React.Fragment>
            );
        }
        return(
            <React.Fragment>
                Venue Name: {venueName} <br/>
                Venue Location: {venueLocation} <br/>
            </React.Fragment>
        )
    }

    return(
        <React.Fragment>
            <Card>
                <CardMedia
                component="img"
                image={userPicture}
                />
                <CardContent>
                    <Typography>
                        {artistRender()}
                    </Typography>
                </CardContent>
                <CardActionArea>
                    <CardActions>
                        <Button variant="contained" className={classes.button} onClick={() => handleViewProfile(userProfile)}>View Profile</Button>
                        {isFollow ? <Button variant="contained" className={classes.button} onClick={() => unFollow(user, userProfile)}><Typography>UnFollow</Typography></Button> : <Button variant="contained" className={classes.button} onClick={() => follow(user, userProfile)}><Typography>Follow</Typography></Button>}
                    </CardActions>
                </CardActionArea>
            </Card>
        </React.Fragment>
    );
}

export default UserCard;