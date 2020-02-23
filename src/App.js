import React, { useContext, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Navigation from './components/Navigation/Navigation';
import Aux from './hoc/Auxiliary/Auxiliary';
import Dashboard from './components/Activity/Dashboard/Dashboard';
import { observer } from 'mobx-react-lite';
import { Route, withRouter, Switch } from 'react-router-dom';
import Home from './components/Home/Home';
import ActivityForm from './components/Activity/Form/ActivityForm';
import Detail from './components/Activity/Detail/Detail';
import NotFound from './components/Navigation/NotFound/NotFound';
import { ToastContainer } from 'react-toastify';
import { RootStoreContext } from './stores/rootStore';
import Loading from './components/UI/Loading/Loading';
import ModalContainer from './components/UI/Modal/ModalContainer';
import ProfilePage from './components/Profile/ProfilePage';

const App = props => {
  const rootStore = useContext(RootStoreContext);
  const { setAppLoaded, token, appLoaded } = rootStore.commonStore;
  const { getUser } = rootStore.userStore;
  useEffect(() => {
    if (token) getUser().finally(() => setAppLoaded());
    else setAppLoaded();
  }, [getUser, setAppLoaded, token]);
  if (!appLoaded) return <Loading content='Loading app...' />;
  return (
    <Aux>
      <ModalContainer />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={Home} />
      <Route
        path={'/(.+)'} // slashtan sonra ne gelirse gelsin seçilen Route burası. onun dışındakiler (sadece slash) home page.
        //Switch sadece 1 rootun dolmasını sağlar
        render={() => (
          <Aux>
            <Navigation />
            <Container style={{ marginTop: '7em' }}>
              <Switch>
                <Route exact path='/activities' component={Dashboard} />
                <Route path='/activities/:id' component={Detail} />
                <Route
                  key={props.location.key}
                  path={['/create-activity', '/manage/:id']}
                  component={ActivityForm}
                />
                <Route path='/profile/:username' component={ProfilePage} />
                <Route component={NotFound} />
              </Switch>
            </Container>
          </Aux>
        )}
      />
    </Aux>
  );
};

export default withRouter(observer(App));
