import React, { useContext } from 'react';
import { Form as FinalForm, Field } from 'react-final-form';
import { Form, Button, Header } from 'semantic-ui-react';
import TextInput from '../UI/Form/TextInput/TextInput';
import { RootStoreContext } from '../../stores/rootStore';
import { FORM_ERROR } from 'final-form';
import { combineValidators, isRequired } from 'revalidate';
import ErrorMessage from '../UI/ErrorMessage/ErrorMessage';

const validate = combineValidators({
  userName: isRequired('userName'),
  displayName: isRequired('displayName'),
  email: isRequired('email'),
  password: isRequired('password')
});
const RegisterForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { register } = rootStore.userStore;
  return (
    <FinalForm
      onSubmit={values =>
        register(values).catch(error => ({
          [FORM_ERROR]: error
        }))
      }
      validate={validate}
      render={({
        handleSubmit,
        submitting,
        form,
        submitError,
        invalid,
        pristine,
        dirtySinceLastSubmit
      }) => (
        <Form onSubmit={handleSubmit} error>
          <Header
            as='h2'
            content='Sign up to Reactivities'
            color='teal'
            textAlign='center'
          />
          <Field
            name='userName'
            component={TextInput}
            placeholder='User Name'
          />
          <Field
            name='displayName'
            component={TextInput}
            placeholder='Display Name'
          />
          <Field name='email' component={TextInput} placeholder='Email' />
          <Field
            name='password'
            component={TextInput}
            placeholder='Password'
            type='password'
          />
          {submitError && !dirtySinceLastSubmit && (
            <ErrorMessage error={submitError} />
          )}
          <br />
          <Button
            loading={submitting}
            color='teal'
            content='Register'
            disabled={(invalid && !dirtySinceLastSubmit) || pristine}
            fluid
          />
          {/*<pre>{JSON.stringify(form.getState(), null, 2)}</pre>*/}
        </Form>
      )}
    />
  );
};

export default RegisterForm;
