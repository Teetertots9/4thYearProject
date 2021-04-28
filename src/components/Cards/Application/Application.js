import React, {useState} from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Card, CardContent, CardActionArea, Typography, Grid} from '@material-ui/core';
import { Person } from '@material-ui/icons';
import defaultImage from '../../../images/band.jpg';
import ApplicationDialog from '../../Dialogs/Application/Application'

const useStyles = makeStyles(theme => ({
    avatar: {
        width: 100,
        height: 100,
        marginBottom: theme.spacing(3)
      },
      avatarIcon: {
        width: '80%',
        height: '80%'
      },
      avatarContent: {
        padding: theme.spacing(3),
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
      },
    root: {
        maxWidth: 450,
        maxHeight: 600,
        marginBottom: 75,
        marginLeft: 75,
    },
    title: {
      fontSize: 20,
      margin: 5,
    },
    media: {
        height: 100,
      },
  }));

function Application({application, acceptApplication}){

    const classes = useStyles();
    const [open, setOpen] = useState(false)

    const Open = () => { setOpen(true);}
    const Close = () => { setOpen(false);}

    return(
        <React.Fragment>
        <Card className={classes.root} variant="outlined">
            <CardContent
                className={classes.avatarContent}
                >
                { application.artistImage ?
                      <Avatar aria-label={name} src={application.artistImage} className={classes.avatar} />
                      :
                      <Avatar aria-label={name} className={classes.avatar}>
                        <Person className={classes.avatarIcon} />
                      </Avatar>
                    }
                    </CardContent>
            <CardActionArea onClick={Open}>
                <Grid container spacing={1}>
                <Grid item xs={12}>
                <Typography className={classes.title}>{application.artistName}</Typography>
                </Grid>
                </Grid>
            </CardActionArea>
        </Card>
        <ApplicationDialog 
        open={open}
        handleClose={Close}
        application={application}
        acceptApplication={acceptApplication}/>
        </React.Fragment>
)
}

Application.propTypes = {
    application: PropTypes.object,
    acceptApplication: PropTypes.func
  };

export default Application;