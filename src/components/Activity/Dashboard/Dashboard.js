import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';

const Dashboard = props => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList activities={props.activities} />
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
