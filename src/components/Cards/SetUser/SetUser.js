import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FileUploader from '../../utils/FileUpload/FileUploader';
import { Card, Grid, Button, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, TextField, Typography} from '@material-ui/core';

const useStyles = makeStyles({
      button: {
        margin: 5,
        backgroundColor: "#FAA653"
    }
  });

function SetUser({handleSetUserType}){
    const classes = useStyles();
    const [name, setName] = useState();
    const [userType, setUserType] = useState();
    const [address, setAddress] = useState();
    const [picture, setPicture] = useState();
    const [picName, setPicName] = useState("");

  const handleImageSelection = (image) => {
    setPicture(image);
  };

    const submitUserAttributes = async () => {
        let attributes = {};
        const fileType = picName.split(".").pop();
        if(fileType !== "jpg" && fileType !== "png"){
            alert("Please add file type to end of file name");
        } else if(picture && name && userType && userType !== "venue"){
                attributes = {
                    'name' : name,
                    'custom:user_type' : userType, 
                }
            handleSetUserType(attributes, picture);
        }
        else if(picture && name && userType && address){
                attributes = {
                    'name' : name,
                    'custom:user_type' : userType,
                    'address': address,
                }
            handleSetUserType(attributes, picture, userType);
        }
        else{
           alert("Please fill out all fields and upload a user image");
        }
    }

    const handleChange = (event) => {
        setUserType(event.target.value);
      };
      

    return(
        <Card>
            <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="flex-end">
                <Grid item xs={12}>
                    <Typography>Before you continue to the app<br/> we need a few more details from you</Typography>
                </Grid>
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Username/Artist/Venue Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={12}>
                <FormControl component="fieldset">
                    <FormLabel component="legend">User Type</FormLabel>
                    <RadioGroup aria-label="user_type" name="user" value={userType} onChange={handleChange}>
                        <FormControlLabel value="artist" control={<Radio />} label="Artist" />
                        <FormControlLabel value="venue" control={<Radio />} label="Venue" />
                        <FormControlLabel value="fan" control={<Radio />} label="Fan" />
                    </RadioGroup>
                    </FormControl>
                </Grid>
                {userType === "venue" &&
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    label="Venue Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    variant="outlined"
                />
                </Grid>
                }
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="User Image Name (please add file type to name, i.e .jpg)"
                    value={picName}
                    onChange={(e) => setPicName(e.target.value)}
                    variant="outlined"
                    required
                />
                </Grid>
                <Grid item xs={12}>
                <FileUploader
                    id="picture"
                    data-cy="picture"
                    name={picName}
                    label="user picture"
                    value={picture}
                    handleChange={handleImageSelection}
                    multiple={false}
                    accept="image/*"
                />
                </Grid>
            </Grid>
            <Button variant="contained" className={classes.button} onClick={submitUserAttributes}>Submit</Button>
        </Card>
    )
}

export default SetUser;