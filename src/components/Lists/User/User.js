import React from 'react';
import { Grid } from '@material-ui/core';
import UserCard from '../../Cards/User/User';

function UserList({user, userProfiles, handleFollowUser, handleViewProfile}){

  const renderUserCard = (userProfiles) => {
    if(userProfiles){
      return (
        <Grid container spacing={1}>
          {userProfiles.map(userProfile => {
              return (
                  <Grid item xs={12} lg={4} key={userProfiles.user_id}>
                  <UserCard
                  userProfile={userProfile}
                  user={user}
                  handleViewProfile={handleViewProfile}
                  handleFollowUser={handleFollowUser}
                />
                  </Grid>
                )
            })
          }
        </Grid>
      );
    }
  };

  return(
    <React.Fragment>
    {renderUserCard(userProfiles)}
    </React.Fragment>
  );
}

  export default UserList;