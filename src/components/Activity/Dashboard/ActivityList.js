import React, { useContext } from 'react';
import { Item, Label } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityListItem from './ActivityListItem';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import { RootStoreContext } from '../../../stores/rootStore';
import { format } from 'date-fns';

const ActivityList = props => {
  const rootStore = useContext(RootStoreContext);
  const { activitiesByDate } = rootStore.activityStore;
  return (
    <Aux>
      {activitiesByDate.map(([group, activities]) => (
        <Aux key={group}>
          {' '}
          <Label size='large' color='blue'>
            {format(group, 'eeee do MMMM')}
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
