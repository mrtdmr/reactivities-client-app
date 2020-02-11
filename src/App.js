import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'semantic-ui-react';
import Navigation from './components/Navigation/Navigation';
import Aux from './hoc/Auxiliary/Auxiliary';
import Dashboard from './components/Activity/Dashboard/Dashboard';
import agent from './api/agent';
import Loading from './components/UI/Loading/Loading';
import ActivityStore from './stores/activityStore';

const App = () => {
  const activityStore = useContext(ActivityStore);
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [target, setTarget] = useState('');
  useEffect(() => {
    agent.Activities.list()
      .then(res => {
        let activities = [];
        res.forEach(activity => {
          activity.date = activity.date.split('.')[0];
          activities.push(activity);
        });
        setActivities(activities);
      })
      .then(() => setLoading(false));
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
    setSubmitting(true);
    agent.Activities.create(activity)
      .then(() => {
        setActivities([...activities, activity]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const editActivityHandler = activity => {
    setSubmitting(true);
    agent.Activities.update(activity)
      .then(() => {
        setActivities([
          ...activities.filter(a => a.id !== activity.id),
          activity
        ]);
        setSelectedActivity(activity);
        setEditMode(false);
      })
      .then(() => setSubmitting(false));
  };
  const deleteActivityHandler = (event, id) => {
    setSubmitting(true);
    setTarget(event.currentTarget.name);
    agent.Activities.delete(id)
      .then(() => {
        setActivities([...activities.filter(a => a.id !== id)]);
      })
      .then(() => setSubmitting(false));
  };
  if (loading) return <Loading content='Loading activities...' inverted />;
  return (
    <Aux>
      <Navigation openCreateForm={openCreateFormHandler} />
      <Container style={{ marginTop: '7em' }}>
        <h1>{activityStore.title}</h1>
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
          submitting={submitting}
          target={target}
        />
      </Container>
    </Aux>
  );
};

export default App;
