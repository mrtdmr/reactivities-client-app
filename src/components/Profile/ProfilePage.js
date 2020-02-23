import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import ProfileHeader from './ProfileHeader';
import ProfileContent from './ProfileContent';
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';
import Loading from '../UI/Loading/Loading';

const ProfilePage = props => {
  const rootStore = useContext(RootStoreContext);
  const { loadingProfile, profile, loadProfile } = rootStore.profileStore;

  useEffect(() => {
    loadProfile(props.match.params.username);
  }, [loadProfile, props.match.params.username]);
  if (loadingProfile) return <Loading content='Loading profile' inverted />;
  return (
    <Grid>
      <Grid.Column width={16}>
        <ProfileHeader profile={profile} />
        <ProfileContent />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ProfilePage);
