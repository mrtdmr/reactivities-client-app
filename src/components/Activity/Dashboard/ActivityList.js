import React, { useContext } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../stores/activityStore';
import ActivityListItem from './ActivityListItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const ActivityList = props => {
  const activityStore = useContext(ActivityStore);
  const { activitiesByDate } = activityStore;
  return (
    <Aux>
      {activitiesByDate.map(([group, activities]) => (
        <Aux key={group}>
          {' '}
          <Label size='large' color='blue'>
            {group}
          </Label>
          <Item.Group divided>
            {activities.map(a => (
              <ActivityListItem key={a.id} activity={a} />
            ))}
          </Item.Group>
        </Aux>
      ))}
    </Aux>
  );
};

export default observer(ActivityList);
