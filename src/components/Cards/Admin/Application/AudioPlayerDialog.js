import React from 'react';
import Audio from '../../../utils/AudioPlayer/Audio';
import {Dialog, DialogContent, DialogActions, Button} from '@material-ui/core';

function AudioPlayerDialog({soundFile, soundFileName, artistName, open, handleClose}){

    return(
        <Dialog
        open={open}
        handleClose={handleClose}>
            <DialogContent>
            <Audio source={soundFile}
                    name={soundFileName}
                    artist={artistName}/>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close Player</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AudioPlayerDialog;