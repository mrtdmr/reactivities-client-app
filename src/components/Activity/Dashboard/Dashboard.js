import React, { useContext } from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList';
import Detail from '../Detail/Detail';
import ActivityForm from '../Form/ActivityForm';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../stores/activityStore';

const Dashboard = props => {
  const activityStore = useContext(ActivityStore);
  const { editMode, activity } = activityStore;
  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        {activity && !editMode && <Detail />}
        {editMode && (
          <ActivityForm
            key={(activity && activity.id) || 0}
            activity={activity}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(Dashboard);
