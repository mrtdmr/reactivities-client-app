import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../stores/activityStore';
import Loading from '../../UI/Loading/Loading';
import Header from './Header';
import Info from './Info';
import Chat from './Chat';
import SideBar from './SideBar';

const Detail = props => {
  const activityStore = useContext(ActivityStore);
  const { activity, loadActivity, loadingInitial } = activityStore;

  useEffect(() => {
    loadActivity(props.match.params.id);
  }, [loadActivity, props.match.params.id]);

  if (loadingInitial || !activity)
    return <Loading content='Loading activity' inverted />;
  return (
    <Grid>
      <Grid.Column width={10}>
        <Header />
        <Info />
        <Chat />
      </Grid.Column>
      <Grid.Column width={6}>
        <SideBar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(Detail);
