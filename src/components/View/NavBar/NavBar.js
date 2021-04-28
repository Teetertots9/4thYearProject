import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu'
import { Menu, MenuItem, AppBar, Toolbar, Button, Typography, IconButton } from '@material-ui/core';
import { AmplifySignOut } from '@aws-amplify/ui-react';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    color: 'red',
  },
  button: {
    margin: 5,
    backgroundColor: "#FAA653"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  menuColour: {
    backgroundColor: "#E3653D",
  }
}));

 function NavBar({user, openCreate, page, changePage}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { name } = user.attributes;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChangePage = (pageType, user) => {
    changePage(pageType, user);
    handleClose();
  }

  const classes = useStyles();

  const renderNavBar = (page) => {
    if(page === "admin"){
        return (
          <div className={classes.root}>
      <AppBar colorPrimary position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={handleClick} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Séobooker - Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}><AmplifySignOut/></MenuItem>
      </Menu>
    </div>
        );
    }
      return (
        <div className={classes.root}>
      <AppBar className={classes.menuColour} position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon onClick={handleClick} />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Séobooker
          </Typography>
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {page === "events" ? <MenuItem onClick={() => handleChangePage("profile", user)}>Profile</MenuItem> : <MenuItem onClick={() => handleChangePage("events", user)}>Home</MenuItem>}
        {user.attributes && user.attributes['custom:user_type'] === 'venue' ? <MenuItem onClick={handleClose}><Button variant="contained" className={classes.button} onClick={openCreate}>Create New Event</Button></MenuItem> : <MenuItem onClick={handleClose}><Button variant="contained" className={classes.button} onClick={() => handleChangePage("search-events", user)}>Search Events</Button></MenuItem>}
        {user.attributes && user.attributes['custom:user_type'] === 'fan' ? <MenuItem onClick={handleClose}><Button variant="contained" className={classes.button} onClick={() => handleChangePage("search", user)}>Search Artists/Venues</Button></MenuItem> : null}
        <MenuItem onClick={handleClose}><AmplifySignOut/></MenuItem>
      </Menu>
    </div>
      );
  };

  return (
    <React.Fragment>
      {renderNavBar(page)}
    </React.Fragment>
  );
}

export default NavBar;