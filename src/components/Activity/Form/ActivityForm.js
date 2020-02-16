import React, { useState, useContext, useEffect } from 'react';
import { Segment, Form, Button, Grid } from 'semantic-ui-react';
import { v4 as uuid } from 'uuid';
import ActivityStore from '../../../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { Form as FinalForm, Field } from 'react-final-form';
import TextInput from '../../UI/Form/TextInput/TextInput';
import TextAreaInput from '../../UI/Form/TextAreaInput/TextAreaInput';
import SelectInput from '../../UI/Form/SelectInput/SelectInput';
import { category } from '../../UI/Form/SelectInput/categoryOptions';
import DateInput from '../../UI/Form/DateInput/DateInput';
import { combineDateAndTime } from '../../../utils/utils';
import { activityClass } from '../activityClass';

const ActivityForm = props => {
  const activityStore = useContext(ActivityStore);
  const {
    createActivity,
    editActivity,
    submitting,
    loadActivity
  } = activityStore;

  const [addActivity, setAddActivity] = useState(new activityClass());
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (props.match.params.id) {
      setLoading(true);
      loadActivity(props.match.params.id)
        .then(activity => {
          setAddActivity(new activityClass(activity));
        })
        .finally(setLoading(false));
    }
  }, [loadActivity, props.match.params.id]);

  const finalFormSubmitHandler = values => {
    const dateAndTime = combineDateAndTime(values.date, values.time);
    const { date, time, ...addActivity } = values;
    addActivity.date = dateAndTime;

    if (!addActivity.id) {
      let newActivity = { ...addActivity, id: uuid() };
      createActivity(newActivity);
    } else {
      editActivity(addActivity);
    }
  };
  return (
    <Grid>
      <Grid.Column width={10}>
        <Segment clearing>
          <FinalForm
            initialValues={addActivity}
            onSubmit={finalFormSubmitHandler}
            render={({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} loading={loading}>
                <Field
                  placeholder='Title'
                  value={addActivity.title}
                  name='title'
                  component={TextInput}
                />
                <Field
                  placeholder='Description'
                  value={addActivity.description}
                  name='description'
                  rows='3'
                  component={TextAreaInput}
                />
                <Field
                  placeholder='Category'
                  value={addActivity.category}
                  name='category'
                  options={category}
                  component={SelectInput}
                />
                <Form.Group widths='equal'>
                  <Field
                    placeholder='Date'
                    date={true}
                    value={addActivity.date}
                    name='date'
                    component={DateInput}
                  />
                  <Field
                    placeholder='Time'
                    time={true}
                    value={addActivity.time}
                    name='time'
                    component={DateInput}
                  />
                </Form.Group>
                <Field
                  placeholder='City'
                  value={addActivity.city}
                  name='city'
                  component={TextInput}
                />
                <Field
                  placeholder='Venue'
                  value={addActivity.venue}
                  name='venue'
                  component={TextInput}
                />
                <Button
                  loading={submitting}
                  disabled={loading}
                  floated='right'
                  positive
                  type='submit'
                  content='Submit'
                />
                <Button
                  floated='right'
                  content='Cancel'
                  onClick={
                    addActivity.id
                      ? () =>
                          props.history.push(`/activities/${addActivity.id}`)
                      : () => props.history.push(`/activities/`)
                  }
                  disabled={loading}
                />
              </Form>
            )}
          />
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityForm);
