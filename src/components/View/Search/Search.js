import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, IconButton, AppBar, TextField, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import UserList from '../../Lists/User/User';
import { WellArchitected } from 'aws-sdk';

const useStyles = makeStyles((theme) => ({
    menuColour: {
      backgroundColor: "#FDBC44",
      color: "white",
    }
  }));

function SearchUsers({userProfiles, user, handleSearchUsers, handleFollowUser, handleViewProfile}){
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [userType, setType] = useState("");

    const handleChange = (event) => {
        setType(event.target.value);
      };

    return(
        <React.Fragment>
            <AppBar className={classes.menuColour} position="static" >
                <Toolbar>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Select Type</FormLabel>
                    <RadioGroup row aria-label="user_type" name="user" value={userType} onChange={handleChange}>
                        <FormControlLabel value="artist" control={<Radio />} label="Artist" />
                        <FormControlLabel value="venue" control={<Radio />} label="Venue" />
                    </RadioGroup>
                    </FormControl>
            <TextField
                    required
                    fullWidth
                    label="Search Artist/Venue"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    variant="outlined"
                />
                    <IconButton onClick={() => handleSearchUsers(userType, search)}><SearchIcon/></IconButton>
                </Toolbar>  
        </AppBar>
        <UserList
        user={user}
        userProfiles={userProfiles}
        handleFollowUser={handleFollowUser}
        handleViewProfile={handleViewProfile}/>
        </React.Fragment>
        
    )
}

export default SearchUsers;