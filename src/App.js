import React, { useState, useEffect } from 'react';
import { Container } from 'semantic-ui-react';
import Navigation from './components/Navigation/Navigation';
import Aux from './hoc/Auxiliary/Auxiliary';
import Dashboard from './components/Activity/Dashboard/Dashboard';
import agent from './api/agent';

const App = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [editMode, setEditMode] = useState(false);
  useEffect(() => {
    agent.Activities.list().then(res => {
      let activities = [];
      res.forEach(activity => {
        activity.date = activity.date.split('.')[0];
        activities.push(activity);
      });
      setActivities(activities);
    });
  }, []);

  const selectActivityHandler = id => {
    setSelectedActivity(activities.filter(a => a.id === id)[0]);
    setEditMode(false);
  };
  const openCreateFormHandler = () => {
    setSelectedActivity(null);
    setEditMode(true);
  };
  const createActivityHandler = activity => {
    agent.Activities.create(activity).then(() => {
      setActivities([...activities, activity]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };
  const editActivityHandler = activity => {
    agent.Activities.update(activity).then(() => {
      setActivities([
        ...activities.filter(a => a.id !== activity.id),
        activity
      ]);
      setSelectedActivity(activity);
      setEditMode(false);
    });
  };
  const deleteActivityHandler = id => {
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a => a.id !== id)]);
    });
  };
  return (
    <Aux>
      <Navigation openCreateForm={openCreateFormHandler} />
      <Container style={{ marginTop: '7em' }}>
        <Dashboard
          selected={selectActivityHandler}
          activities={activities}
          selectedAct={selectedActivity}
          editMode={editMode}
          setEditMode={setEditMode}
          setSelectedActivity={setSelectedActivity}
          createActivity={createActivityHandler}
          editActivity={editActivityHandler}
          deleteActivity={deleteActivityHandler}
        />
      </Container>
    </Aux>
  );
};

export default App;
