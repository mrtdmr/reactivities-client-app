import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import { Header, Icon, List } from 'semantic-ui-react';

const App = () => {
  const [values, setValues] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:5000/api/values').then(res => {
      setValues(res.data);
    });
  }, []);
  return (
    <div>
      <Header as='h2'>
        <Icon name='users' />
        <Header.Content>Reactivities</Header.Content>
      </Header>
      <List>
        {values.map(v => {
          return <List.Item key={v.id}>{v.name}</List.Item>;
        })}
      </List>
    </div>
  );
};

export default App;
