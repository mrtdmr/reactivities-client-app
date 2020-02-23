import React from 'react';
import { List, Image, Popup } from 'semantic-ui-react';

const ActivityListItemAttendees = props => {
  return (
    <List horizontal>
      {props.attendees.map(attendee => (
        <List.Item key={attendee.userName}>
          <Popup
            header={attendee.displayName}
            trigger={
              <Image
                size='mini'
                circular
                src={attendee.image || 'assets/user.png'}
              />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListItemAttendees;
