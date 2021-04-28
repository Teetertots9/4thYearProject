import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FileUploader from '../../utils/FileUpload/FileUploader';
import { Grid, Button,TextField, Typography, Dialog, DialogContent, DialogTitle, DialogActions} from '@material-ui/core';

const useStyles = makeStyles({
      button: {
        margin: 5,
        backgroundColor: "#FAA653"
    }
  });

function UpdateUser({handleUpdateUser, user, open, handleClose}){
    const classes = useStyles();
    const [name, setName] = useState(user.attributes.name);
    const [userType, setUserType] = useState(user.attributes["custom:user_type"]);
    const [address, setAddress] = useState(user.attributes.address || "");
    const [picture, setPicture] = useState(user.attributes["custom:user_image"]);
    const [picName, setPicName] = useState("profile.png");
    const [changedPicture, setChangedPicture] = useState(false);

  const handleImageSelection = (image) => {
    setPicture(image);
    setChangedPicture(true);
  };

    const submitUserAttributes = async () => {
        let attributes = {};
        const fileType = picName.split(".").pop();
        if(fileType !== "jpg" && fileType !== "png"){
            alert("Please add file type to end of file name");
        } else if(picture && name && userType && userType !== "venue"){
                attributes = {
                    ...user.attributes,
                    name : name,
                }
            if(changedPicture){
                handleUpdateUser(attributes, picture, changedPicture);
            } else {
                handleUpdateUser(attributes, picture, changedPicture);
            }
        }
        else if(picture && name && userType && address){
                attributes = {
                    ...user.attributes,
                    name : name,
                    address: address
                }
            if(changedPicture){
                handleUpdateUser(attributes, picture, changedPicture);
            } else {
                handleUpdateUser(attributes, picture, changedPicture);
            }
        }
        else{
           alert("Please fill out all fields and upload a user image");
        }
    }
      

    return(
        <Dialog
        fullWidth={true}
        open={open}
        onClose={handleClose}>
            <DialogTitle>Update User Info</DialogTitle>
            <DialogContent>
            <Grid
            container
            spacing={1}>
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
            </DialogContent>
            <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="outlined" className={classes.button} onClick={submitUserAttributes}>Submit</Button>
            </DialogActions>  
        </Dialog>
    )
}

export default UpdateUser;