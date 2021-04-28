import React from 'react';
import { Dialog, DialogContent, Button, DialogActions, Typography } from '@material-ui/core';

function AdminEventDialog({handleDeleteEvent, event, handleClose, open}){

    const deleteEvent = (applicationId) => {
        handleDeleteEvent(applicationId);
    }

    return(
            <Dialog
            open={open}
            handleClose={handleClose}>
                <DialogContent>
                        <Typography>
                            Are you sure you want to delete this Event?
                        </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => deleteEvent(event)}>Confirm Delete</Button>
                </DialogActions>
            </Dialog>
    )
}

export default AdminEventDialog;