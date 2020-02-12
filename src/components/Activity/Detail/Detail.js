import React, { useContext, useEffect } from 'react';
import { Grid } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import ActivityStore from '../../../stores/activityStore';
import Loading from '../../UI/Loading/Loading';
import DetailHeader from './DetailHeader';
import DetailInfo from './DetailInfo';
import DetailChat from './DetailChat';
import DetailSideBar from './DetailSideBar';

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
