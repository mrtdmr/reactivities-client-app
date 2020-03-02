import React from 'react';
import {
  Segment,
  Item,
  Header,
  Button,
  Grid,
  Statistic,
  Divider,
  Reveal
} from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';

const ProfileHeader = props => {
  return (
    <Segment>
      <Grid>
        <Grid.Column width={12}>
          <Item.Group>
            <Item>
              <Item.Image
                avatar
                size='small'
                src={props.profile.image || '/assets/user.png'}
              />
              <Item.Content verticalAlign='middle'>
                <Header as='h1'>{props.profile.displayName}</Header>
              </Item.Content>
            </Item>
          </Item.Group>
        </Grid.Column>
        <Grid.Column width={4}>
          <Statistic.Group widths={2}>
            <Statistic label='Followers' value={props.profile.followersCount} />
            <Statistic label='Following' value={props.profile.followingCount} />
          </Statistic.Group>
          <Divider />
          {!props.isCurrentUser && (
            <Reveal animated='move'>
              <Reveal.Content visible style={{ width: '100%' }}>
                <Button
                  fluid
                  color='teal'
                  content={
                    props.profile.following ? 'Following' : 'Not Following'
                  }
                />
              </Reveal.Content>
              <Reveal.Content hidden>
                <Button
                  loading={props.loading}
                  fluid
                  basic
                  color={props.profile.following ? 'red' : 'green'}
                  content={props.profile.following ? 'Unfollow' : 'Follow'}
                  onClick={() =>
                    props.profile.following
                      ? props.unFollow(props.profile.userName)
                      : props.follow(props.profile.userName)
                  }
                />
              </Reveal.Content>
            </Reveal>
          )}
        </Grid.Column>
      </Grid>
    </Segment>
  );
};
export default observer(ProfileHeader);
