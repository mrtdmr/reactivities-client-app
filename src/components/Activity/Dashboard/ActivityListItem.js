import React from 'react';
import { Item, Button, Segment, Icon, Label } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import ActivityListItemAttendees from './ActivityListItemAttendees';

const ActivityListItem = props => {
  const host = props.activity.attendees.filter(x => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment>
        <Item.Group>
          <Item>
            <Item.Image
              size='tiny'
              circular
              src={host.image || '/assets/user.png'}
              style={{ marginBottom: 3 }}
            />
            <Item.Content>
              <Item.Header as={Link} to={`/activities/${props.activity.id}`}>
                {props.activity.title}
              </Item.Header>
              <Item.Description>
                Hosted by
                <Link to={`/profile/${host.userName}`}>
                  {' '}
                  {host.displayName}
                </Link>
              </Item.Description>
              <Item.Description>
                {props.activity.isHost && (
                  <Label
                    basic
                    color='orange'
                    content='You are hosting this activity'
                  />
                )}
                {props.activity.isGoing && !props.activity.isHost && (
                  <Label
                    basic
                    color='green'
                    content='You are going to this activity'
                  />
                )}
              </Item.Description>
            </Item.Content>
          </Item>
        </Item.Group>
      </Segment>
      <Segment>
        <Icon name='clock' />
        {format(props.activity.date, 'h:mm a')}
        <Icon name='marker' />
        {props.activity.venue},{props.activity.city}
      </Segment>
      <Segment secondary>
        <ActivityListItemAttendees attendees={props.activity.attendees} />
      </Segment>
      <Segment clearing>
        <span>{props.activity.description}</span>
        <Button
          as={Link}
          to={`/activities/${props.activity.id}`}
          floated='right'
          content='View'
          color='blue'
        />
      </Segment>
    </Segment.Group>
  );
};

export default ActivityListItem;
