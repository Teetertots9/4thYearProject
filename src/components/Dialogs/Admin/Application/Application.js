import React from 'react';
import { Dialog, DialogContent, Button, DialogActions, Typography } from '@material-ui/core';

function AdminApplicationDialog({handleDeleteApplication, application, handleClose, open}){

    const deleteApplication = (application) => {
        handleDeleteApplication(application);
    }

    return(
            <Dialog
            open={open}
            handleClose={handleClose}>
                <DialogContent>
                        <Typography>
                            Are you sure you want to delete this Application?
                        </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => deleteApplication(application)}>Confirm Delete</Button>
                </DialogActions>
            </Dialog>
    )
}

export default AdminApplicationDialog;