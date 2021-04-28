import React from 'react';
import { Grid } from '@material-ui/core';
import AdminApplicationCard from '../../../Cards/Admin/Application/Application';


function AdminApplicationList({applications, handleDeleteApplication}){

    const renderApplicationCard = (applications) => {
      if(applications){
        return (
          <Grid container spacing={1}>
            {applications.map(application => {
                return (
                    <Grid item xs={12} lg={3} key={application.applicationId}>
                    <AdminApplicationCard
                      application={application}
                      handleDeleteApplication={handleDeleteApplication}
                    />
                    </Grid>
                  )
              })
            }
          </Grid>
        );
      }
    };

    return(
      <React.Fragment>
        {renderApplicationCard(applications)}
      </React.Fragment>
    )
}

export default AdminApplicationList;