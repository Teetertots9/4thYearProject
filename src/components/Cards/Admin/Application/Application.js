import React, { useState } from 'react';
import { Card, CardMedia, CardContent, CardActions, CardActionArea, Typography, Button} from '@material-ui/core';
import AdminApplicationDialog from '../../../Dialogs/Admin/Application/Application';
import AudioPlayerDialog from './AudioPlayerDialog';

/*eslint-disable-next-line*/
const moment = require('moment');
/*eslint-disable-next-line*/
require('moment/locale/en-ie');

function AdminApplicationCard({handleDeleteApplication, application}){
    const { createdAt, updatedAt, applicationHook, artistName, artistImage, soundFileName, soundFile, artistId, eventId } = application;
    const [open, setOpen] = useState(false);
    const [isPlayer, setPlayer ] = useState(false)
    const openDelete = () => setOpen(true);
    const close = () => setOpen(false);
    const openPlayer = () => setPlayer(true);
    const closePlayer = () => setPlayer(false);

    return(
        <React.Fragment>
            <Card>
                <CardMedia
                component="img"
                image={artistImage}
                />
                <CardContent>
                    <Typography>
                        Event Id: {eventId}<br/>
                        Artist Id: {artistId}<br/>
                        Artist Name: {artistName}<br/>
                        Application Hook: {applicationHook}<br/>
                        Created At: {moment(createdAt).format('L')}<br/>
                        Updated At: {moment(updatedAt).format('L')}<br/>
                        Sound File: <Button onClick={openPlayer}>Open Audio Player</Button>
                    </Typography>
                </CardContent>
                <CardActionArea>
                    <CardActions>
                        <Button onClick={openDelete}>Delete Application</Button>
                    </CardActions>
                </CardActionArea>
            </Card>
            <AdminApplicationDialog
            open={open}
            handleClose={close}
            handleDeleteApplication={handleDeleteApplication}
            application={application}/>
            <AudioPlayerDialog
            open={isPlayer}
            handleClose={closePlayer}
            soundFile={soundFile}
            soundFileName={soundFileName}
            artistName={artistName}/>
        </React.Fragment>
    );
}

export default AdminApplicationCard;