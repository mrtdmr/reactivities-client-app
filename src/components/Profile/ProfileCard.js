import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const ProfileCard = props => {
  return (
    <Card as={Link} to={`/profile/${props.profile.userName}`}>
      <Image src={props.profile.image || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{props.profile.displayName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name='user' />
          {props.profile.followersCount} Followers
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;
