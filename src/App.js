import React from 'react';
import { Container } from 'semantic-ui-react';
import Navigation from './components/Navigation/Navigation';
import Aux from './hoc/Auxiliary/Auxiliary';
import Dashboard from './components/Activity/Dashboard/Dashboard';
import { observer } from 'mobx-react-lite';
import { Route, withRouter } from 'react-router-dom';
import Home from './components/Home/Home';
import ActivityForm from './components/Activity/Form/ActivityForm';
import Detail from './components/Activity/Detail/Detail';

const App = props => {
  return (
    <Aux>
      <Route exact path='/' component={Home} />
      <Route
        path={'/(.+)'} // slashtan sonra ne gelirse gelsin seçilen Route burası. onun dışındakiler (sadece slash) home page.
        render={() => (
          <Aux>
            <Navigation />
            <Container style={{ marginTop: '7em' }}>
              <Route exact path='/activities' component={Dashboard} />
              <Route path='/activities/:id' component={Detail} />
              <Route
                key={props.location.key}
                path={['/create-activity', '/manage/:id']}
                component={ActivityForm}
              />
            </Container>
          </Aux>
        )}
      />
    </Aux>
  );
};

export default withRouter(observer(App));
