import React, { useState, FormEvent, useContext, useEffect } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../stores/activityStore';
import { observer } from 'mobx-react-lite';

const ActivityForm = props => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    activity,
    loadActivity,
    clearActivity
  } = activityStore;

  const [addActivity, setAddActivity] = useState({
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  });
  useEffect(() => {
    if (props.match.params.id && addActivity.id.length === 0) {
      loadActivity(props.match.params.id).then(() => {
        activity && setAddActivity(activity);
      });
    }
    return () => {
      clearActivity();
    };
  }, [
    activity,
    loadActivity,
    props.match.params.id,
    clearActivity,
    addActivity.id.length
  ]);
  const submitHandler = () => {
    if (addActivity.id.length === 0) {
      let newActivity = { ...addActivity, id: uuid() };
      createActivity(newActivity).then(() =>
        props.history.push(`/activities/${newActivity.id}`)
      );
    } else {
      editActivity(addActivity).then(() =>
        props.history.push(`/activities/${addActivity.id}`)
      );
    }
  };
  const inputChangeHandler = (
    event: FormEvent<HTMLInputElement | HTMLFormElement>
  ) => {
    const { name, value } = event.currentTarget;
    setAddActivity({ ...addActivity, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={submitHandler}>
        <Form.Input
          placeholder='Title'
          value={addActivity.title}
          name='title'
          onChange={inputChangeHandler}
        />
        <Form.TextArea
          rows={2}
          placeholder='Description'
          value={addActivity.description}
          name='description'
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder='Category'
          value={addActivity.category}
          name='category'
          onChange={inputChangeHandler}
        />
        <Form.Input
          type='datetime-local'
          placeholder='Date'
          value={addActivity.date}
          name='date'
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder='City'
          value={addActivity.city}
          name='city'
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder='Venue'
          value={addActivity.venue}
          name='venue'
          onChange={inputChangeHandler}
        />
        <Button
          positive
          floated='right'
          type='submit'
          content='Submit'
          loading={submitting}
        />
        <Button
          floated='right'
          content='Cancel'
          onClick={() => props.history.push(`/activities/${addActivity.id}`)}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
