/* eslint react/prop-types: 0 */
import React from 'react';
//import { makeStyles } from '@material-ui/core/styles';
import { DialogContent, DialogActions, Dialog, Button} from '@material-ui/core';
import ApplicationList from '../../Lists/Application/Application';

// const useStyles = makeStyles({
//     root: {
//         maxWidth: 500,
//         maxHeight: 150,
//         padding: 10,
//     },
//     title: {
//       fontSize: 20,
//     },
//     media: {
//         height: 50,
//       },
//       button: {
//         margin: 5,
//     },
//   });

function EventDialog({
    open, handleClose, event, acceptApplication, user
}){

    //const classes = useStyles();  

    const handleAccept = (application) => {
        acceptApplication(event, application);
        handleClose();
    }

    return(
        <Dialog
        fullScreen
        fullWidth={true}
        open={open}
        onClose={handleClose}
        ><DialogContent>
        <ApplicationList 
            applications={event.applications}
            acceptApplication={handleAccept}
            user={user}
            />
        </DialogContent>
            <DialogActions>
            <Button variant="contained" color="secondary" onClick={handleClose}>Cancel</Button>
            </DialogActions>
        </Dialog>
    );
}

export default EventDialog;