import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { RootStoreContext } from '../../stores/rootStore';
import { observer } from 'mobx-react-lite';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn } = rootStore.userStore;
  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn ? <Component {...props} /> : <Redirect to={'/'} />
      }
    />
  );
};

export default observer(PrivateRoute);
