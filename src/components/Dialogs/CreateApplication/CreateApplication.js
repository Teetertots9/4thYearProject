/* eslint react/prop-types: 0 */
import React, { useState, useRef} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, DialogContent, DialogActions, DialogTitle, Dialog, Button, Grid} from '@material-ui/core';
import FileUploader from '../../utils/FileUpload/FileUploader';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        maxHeight: 150,
        padding: 10,
    },
    title: {
      fontSize: 20,
    },
    media: {
        height: 50,
      },
      button: {
        margin: 5,
        backgroundColor: "#FAA653"
    }
  });

function CreateApplication({
    open, handleClose, onSubmit, isFullScreen, event, user
}){
    const classes = useStyles();
    const [applicationHook, setHook ] = useState(""); 
    const [soundFileName, setFileName] = useState("");
    const [soundFile, setFile] = useState();
    const {eventId, venueName, eventDateTime} = event;
    const {name} = user.attributes;
    const image = user.attributes['custom:user_image'];

    const resetApplication = () => {
        setHook("");
    }

    const handleSoundUpload = (sound) => {
        setFile(sound);
    }

    const handleSubmit = () => {
        const fileType = soundFileName.split(".").pop();
        if(fileType !== "mp3" && fileType !== "wav"){
            alert("Please add file type to end of file name");
        } else if(applicationHook && soundFile && soundFileName){
            const newApplication = {
                artistName: name,
                artistImage: image,
                applicationHook,
                createdBy: user.username,
                soundFile,
                soundFileName: soundFile.target.name,
            };
    
            onSubmit(newApplication, event);
            resetApplication();
            handleClose();
        } else{
            alert("Please fill out all fields and upload a sound file");
         }
    };

    return(
        <Dialog
        isFullScreen={isFullScreen || false}
        fullWidth={true}
        open={open}
        onClose={handleClose}
        >
            <DialogTitle>Apply for Event, {venueName} at {eventDateTime}</DialogTitle>
            <DialogContent>
            <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="flex-end">
                <Grid item xs={12}>
                <TextField
                    required
                    fullWidth
                    multiline
                    rows="6"
                    label="Why should you be picked for the event"
                    value={applicationHook}
                    onChange={(e) => setHook(e.target.value)}
                    variant="outlined"
                    inputProps={{ maxLength: 300}}
                    helperText={`${applicationHook.length}/${300}`}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    fullWidth
                    label="Name of Sound file(please add file type to end of name, i.e. .mp3)"
                    value={soundFileName}
                    onChange={(e) => setFileName(e.target.value)}
                    variant="outlined"
                    required
                />
                </Grid>
                <Grid item xs={12}>
                <FileUploader
                    id="audio"
                    data-cy="audio"
                    name={soundFileName}
                    label="Audio Sample for Application"
                    value={soundFile}
                    handleChange={handleSoundUpload}
                    multiple={false}
                    accept="audio/*"
                    required
                />
                </Grid>
            </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button variant="contained" className={classes.button} onClick={handleSubmit}>Apply</Button>
            </DialogActions>
        </Dialog>
    );
}

CreateApplication.defaultProps = {
    applicationHook: "",
    media: ""
}

export default CreateApplication;