import React from 'react';
import { List, Image, Popup } from 'semantic-ui-react';

const ActivityListItemAttendees = props => {
  const styles = {
    borderColor: 'orange',
    borderWidth: 2
  };
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
                bordered
                style={attendee.following ? styles : null}
              />
            }
          />
        </List.Item>
      ))}
    </List>
  );
};

export default ActivityListItemAttendees;
