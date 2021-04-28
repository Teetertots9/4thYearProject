import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Toolbar, IconButton, AppBar, TextField, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import EventList from '../../Lists/Event/Event';

const useStyles = makeStyles((theme) => ({
    menuColour: {
      backgroundColor: "#FDBC44",
      color: "white",
    }
  }));

function EventsSearch({events, createApplication, handleSearchEvents, updateApplication, updateEvent, acceptApplication, user}){
    const classes = useStyles();
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");

    const handleChange = (event) => {
        setType(event.target.value);
      };

    return(
        <React.Fragment>
            <AppBar className={classes.menuColour} position="static" >
                <Toolbar>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Select Type</FormLabel>
                    <RadioGroup row aria-label="type" name="type" value={type} onChange={handleChange}>
                        <FormControlLabel value="artist" control={<Radio />} label="Artist" />
                        <FormControlLabel value="venue" control={<Radio />} label="Venue" />
                    </RadioGroup>
                    </FormControl>
            <TextField
                    required
                    fullWidth
                    label="Search Event"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    variant="outlined"
                />
                    <IconButton onClick={() => handleSearchEvents(type, search)}><SearchIcon/></IconButton>
                </Toolbar>  
        </AppBar>
        <EventList
        user={user}
        events={events}
        createApplication={createApplication}
        acceptApplication={acceptApplication}
        updateApplication={updateApplication}
        updateEvent={updateEvent}/>
        </React.Fragment>
        
    )
}

export default EventsSearch;