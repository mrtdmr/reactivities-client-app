import React, { useState, FormEvent, useContext } from 'react';
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
    cancelFormOpen
  } = activityStore;
  const initializeForm = () => {
    if (props.activity) return props.activity;
    else
      return {
        id: '',
        title: '',
        category: '',
        description: '',
        date: '',
        city: '',
        venue: ''
      };
  };
  const [activity, setActivity] = useState(initializeForm);
  const submitHandler = () => {
    if (activity.id.length === 0) {
      let newActivity = { ...activity, id: uuid() };
      createActivity(newActivity);
    } else {
      editActivity(activity);
    }
  };
  const inputChangeHandler = (
    event: FormEvent<HTMLInputElement | HTMLFormElement>
  ) => {
    const { name, value } = event.currentTarget;
    setActivity({ ...activity, [name]: value });
  };
  return (
    <Segment clearing>
      <Form onSubmit={submitHandler}>
        <Form.Input
          placeholder='Title'
          value={activity.title}
          name='title'
          onChange={inputChangeHandler}
        />
        <Form.TextArea
          rows={2}
          placeholder='Description'
          value={activity.description}
          name='description'
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder='Category'
          value={activity.category}
          name='category'
          onChange={inputChangeHandler}
        />
        <Form.Input
          type='datetime-local'
          placeholder='Date'
          value={activity.date}
          name='date'
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder='City'
          value={activity.city}
          name='city'
          onChange={inputChangeHandler}
        />
        <Form.Input
          placeholder='Venue'
          value={activity.venue}
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
          type='submit'
          content='Cancel'
          onClick={cancelFormOpen}
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
