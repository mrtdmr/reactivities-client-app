import React, { useState, FormEvent } from 'react';
import { Segment, Form, Button } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';

const ActivityForm = props => {
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
      props.createActivity(newActivity);
    } else {
      props.editActivity(activity);
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
        <Button positive floated='right' type='submit' content='Submit' />
        <Button
          floated='right'
          type='submit'
          content='Cancel'
          onClick={() => props.setEditMode(false)}
        />
      </Form>
    </Segment>
  );
};

export default ActivityForm;
