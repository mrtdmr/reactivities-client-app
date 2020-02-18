import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import Loading from '../../UI/Loading/Loading';
import DetailHeader from './DetailHeader';
import DetailInfo from './DetailInfo';
import DetailChat from './DetailChat';
import DetailSideBar from './DetailSideBar';
import { RootStoreContext } from '../../../stores/rootStore';

const Detail = props => {
  const rootStore = useContext(RootStoreContext);
  const { activity, loadActivity, loadingInitial } = rootStore.activityStore;

  useEffect(() => {
    loadActivity(props.match.params.id);
  }, [loadActivity, props.match.params.id, props.history]);

  if (loadingInitial) return <Loading content='Loading activity' inverted />;
  if (!activity) return <h2>Activity Not Found</h2>;
  return (
    <Grid>
      <Grid.Column width={10}>
        <DetailHeader activity={activity} />
        <DetailInfo activity={activity} />
        <DetailChat />
      </Grid.Column>
      <Grid.Column width={6}>
        <DetailSideBar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(Detail);
