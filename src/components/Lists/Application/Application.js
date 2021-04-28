/* eslint react/prop-types: 0 */
import React from 'react';
import { Grid } from '@material-ui/core';
import Application from '../../Cards/Application/Application';


function ApplicationList({applications, acceptApplication, user}){

    const renderApplicationCard = (applications) => {
      if(applications){
        return (
          <Grid container spacing={1}>
            {applications.map(application => {
                return (
                    <Grid item xs={12} lg={4} key={application.applicationId}>
                    <Application
                      application={application}
                      acceptApplication={acceptApplication}
                      user={user}
                    />
                    </Grid>
                  )
              })
            }
          </Grid>
        );
      }
    }

    return(
      <React.Fragment>
        {renderApplicationCard(applications)}
      </React.Fragment>
    )
}

export default ApplicationList;