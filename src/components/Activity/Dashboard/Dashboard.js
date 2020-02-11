import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import Detail from '../Detail/Detail';
import ActivityForm from '../Form/ActivityForm';

const Dashboard = props => {
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList
          select={props.selected}
          activities={props.activities}
          deleteActivity={props.deleteActivity}
        />
      </Grid.Column>
      <Grid.Column width={6}>
        {props.selectedAct && !props.editMode && (
          <Detail
            selectedAct={props.selectedAct}
            setEditMode={props.setEditMode}
            setSelectedActivity={props.setSelectedActivity}
          />
        )}
        {props.editMode && (
          <ActivityForm
            key={(props.selectedAct && props.selectedAct.id) || 0}
            setEditMode={props.setEditMode}
            activity={props.selectedAct}
            createActivity={props.createActivity}
            editActivity={props.editActivity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Dashboard;
