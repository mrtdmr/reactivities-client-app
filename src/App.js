import React, { useEffect, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import Navigation from './components/Navigation/Navigation';
import Aux from './hoc/Auxiliary/Auxiliary';
import Dashboard from './components/Activity/Dashboard/Dashboard';
import Loading from './components/UI/Loading/Loading';
import ActivityStore from './stores/activityStore';
import { observer } from 'mobx-react-lite';

const App = () => {
  const activityStore = useContext(ActivityStore);
  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial)
    return <Loading content='Loading activities...' inverted />;
  return (
    <Aux>
      <Navigation />
      <Container style={{ marginTop: '7em' }}>
        <Dashboard />
      </Container>
    </Aux>
  );
};

export default observer(App);
