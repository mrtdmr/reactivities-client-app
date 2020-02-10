import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'semantic-ui-react';
import Navigation from './components/Navigation/Navigation';
import Aux from './hoc/Auxiliary/Auxiliary';
import Dashboard from './components/Activity/Dashboard/Dashboard';

const App = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/activities').then(res => {
      setActivities(res.data);
    });
  }, []);
  return (
    <Aux>
      <Navigation />
      <Container style={{ marginTop: '7em' }}>
        <Dashboard activities={activities} />
      </Container>
    </Aux>
  );
};

export default App;
