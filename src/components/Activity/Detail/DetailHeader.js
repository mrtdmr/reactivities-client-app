import React, { useContext } from 'react';
import { Segment, Image, Item, Button, Header } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { RootStoreContext } from '../../../stores/rootStore';

const activityImageStyle = {
  filter: 'brightness(30%)'
};

const activityImageTextStyle = {
  position: 'absolute',
  bottom: '5%',
  left: '5%',
  width: '100%',
  height: 'auto',
  color: 'white'
};
const DetailHeader = props => {
  const rootStore = useContext(RootStoreContext);
  const { attendActivity, cancelAttendance, loading } = rootStore.activityStore;
  const host = props.activity.attendees.filter(x => x.isHost)[0];
  return (
    <Segment.Group>
      <Segment basic attached='top' style={{ padding: '0' }}>
        <Image
          src={`/assets/categoryImages/${props.activity.category}.jpg`}
          fluid
          style={activityImageStyle}
        />
        <Segment basic style={activityImageTextStyle}>
          <Item.Group>
            <Item>
              <Item.Content>
                <Header
                  size='huge'
                  content={props.activity.title}
                  style={{ color: 'white' }}
                />
                <p>{format(props.activity.date, 'eeee do MMMM')}</p>
                <p>
                  Hosted by
                  <Link to={`/profile/${host.userName}`}>
                    <strong> {host.displayName}</strong>
                  </Link>
                </p>
              </Item.Content>
            </Item>
          </Item.Group>
        </Segment>
      </Segment>
      <Segment clearing attached='bottom'>
        {props.activity.isHost ? (
          <Button
            color='orange'
            floated='right'
            as={Link}
            to={`/manage/${props.activity.id}`}
          >
            Manage Event
          </Button>
        ) : props.activity.isGoing ? (
          <Button loading={loading} onClick={cancelAttendance}>
            Cancel attendance
          </Button>
        ) : (
          <Button loading={loading} onClick={attendActivity} color='teal'>
            Join Activity
          </Button>
        )}
      </Segment>
    </Segment.Group>
  );
};

export default observer(DetailHeader);
