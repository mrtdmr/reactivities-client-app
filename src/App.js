import React, { useEffect, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import Navigation from './components/Navigation/Navigation';
import Aux from './hoc/Auxiliary/Auxiliary';
import Dashboard from './components/Activity/Dashboard/Dashboard';
import Loading from './components/UI/Loading/Loading';
import ActivityStore from './stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Route } from 'react-router-dom';
import Home from './components/Home/Home';
import ActivityForm from './components/Activity/Form/ActivityForm';
import Detail from './components/Activity/Detail/Detail';

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
        <Route exact path='/' component={Home} />
        <Route path='/activities' component={Dashboard} />
        <Route path='/activities/:id' component={Detail} />
        <Route path='/create-activity' component={ActivityForm} />
      </Container>
    </Aux>
  );
};

export default observer(App);
