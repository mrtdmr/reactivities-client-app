import React, { useContext } from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../stores/activityStore';
import { Link } from 'react-router-dom';

const ActivityList = props => {
  const activityStore = useContext(ActivityStore);
  const {
    activitiesByDate,
    deleteActivity,
    submitting,
    target
  } = activityStore;
  return (
    <Segment clearing>
      <Item.Group divided>
        {activitiesByDate.map(a => {
          return (
            <Item key={a.id}>
              <Item.Content>
                <Item.Header as='a'>{a.title}</Item.Header>
                <Item.Meta>{a.date}</Item.Meta>
                <Item.Description>
                  <div>{a.description}</div>
                  <div>
                    {a.city},{a.venue}
                  </div>
                </Item.Description>
                <Item.Extra>
                  <Button
                    as={Link}
                    to={`/activities/${a.id}`}
                    floated='right'
                    content='View'
                    color='blue'
                  />
                  <Button
                    name={a.id}
                    loading={target === a.id && submitting}
                    floated='right'
                    content='Delete'
                    color='red'
                    onClick={event => deleteActivity(event, a.id)}
                  />
                  <Label basic content={a.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
};

export default observer(ActivityList);
