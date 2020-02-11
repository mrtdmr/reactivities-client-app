import React from 'react';
import { Item, Button, Label, Segment } from 'semantic-ui-react';

const ActivityList = props => {
  return (
    <Segment clearing>
      <Item.Group divided>
        {props.activities.map(a => {
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
                    floated='right'
                    content='View'
                    color='blue'
                    onClick={() => props.select(a.id)}
                  />
                  <Button
                    floated='right'
                    content='Delete'
                    color='red'
                    onClick={() => props.deleteActivity(a.id)}
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

export default ActivityList;
