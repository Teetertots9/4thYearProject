/* eslint react/prop-types: 0 */
import React, { useState } from 'react';
import { TextField, DialogContent, DialogActions, DialogTitle, Dialog, Button, Grid} from '@material-ui/core';
import FileUploader from '../../utils/FileUpload/FileUploader';


function UpdateApplication({
    open, handleClose, onSubmit, isFullScreen, event, user, application
}){
    const {createdBy, updatedAt, createdAt, eventId, artistId } = application;
    const [applicationHook, setHook ] = useState(application.applicationHook); 
    const [soundFileName, setFileName] = useState(application.soundFileName);
    const [soundFile, setFile] = useState(application.soundFile);
    const {venueName, eventDateTime} = event;
    const {name} = user.attributes;
    const image = user.attributes['custom:user_image'];

    const handleSoundUpload = (sound) => {
        setFile(sound);
    }

    const handleSubmit = () => {
        const fileType = soundFileName.split(".").pop();
        if(fileType !== "mp3" && fileType !== "wav"){
            alert("Please add file type to end of file name");
        } else if(applicationHook && soundFile && soundFileName){
            const updateApplication = {
                createdAt,
                createdBy,
                updatedAt,
                eventId,
                artistId,
                artistName: name,
                artistImage: image,
                applicationHook,
                soundFile,
                soundFileName,
            };
    
            onSubmit(updateApplication, application.applicationId);
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
            <DialogTitle>Update Application for Event, {venueName} at {eventDateTime}</DialogTitle>
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
                <Button onClick={handleSubmit}>Update</Button>
            </DialogActions>
        </Dialog>
    );
}

UpdateApplication.defaultProps = {
    applicationHook: "",
    soundFileName: "",
    soundFile: null
}

export default UpdateApplication;