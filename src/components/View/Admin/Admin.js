import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { adminDeleteEvent, adminDeleteApplication} from '../../../functions/Admin';
import {AppBar, Tabs, Tab, Typography, Box} from '@material-ui/core';
import AdminEventList from '../../Lists/Admin/Event/Event';
import AdminApplicationList from '../../Lists/Admin/Application/Application';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );

  
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function AdminView({events, applications, getAdminApplications, getAdminEvents}){
  const classes = useStyles();
    const [value, setValue] = useState(0);

      const handleDeleteEvent = async (event) => {
          try {
            for(var i = 0; i < event.applications; i++){
                await adminDeleteApplication(event.applications[i].applicationId);
              }
              await adminDeleteEvent(event.eventId);
              await getAdminEvents();
              await getAdminApplications();
          } catch (error) {
              console.log(error);
          }
      }

      const handleDeleteApplication = async (application) => {
          try {
            await adminDeleteApplication(application.applicationId);
            await getAdminApplications();
          } catch (error) {
            console.log(error);
          }
      }

      const handleChange = (event, newValue) => {
        setValue(newValue);
      }

      return(
        <div className={classes.root}>
          <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
          <Tab label="Events" {...a11yProps(0)} />
          <Tab label="Applications" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <AdminEventList
        handleDeleteEvent={handleDeleteEvent}
        events={events}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <AdminApplicationList
        applications={applications}
        handleDeleteApplication={handleDeleteApplication}/>
      </TabPanel>
        </div>
      );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

AdminView.propTypes = {
  getAll: PropTypes.func,
  getEvents: PropTypes.func,
  getApplications: PropTypes.func,
  handleChange: PropTypes.func,
  handleDeleteApplication: PropTypes.func,
  handleDeleteEvent: PropTypes.func,
  value: PropTypes.any.isRequired,
};

export default AdminView;