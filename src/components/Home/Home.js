import React, { useContext } from 'react';
import { Container, Segment, Header, Button, Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { RootStoreContext } from '../../stores/rootStore';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import LoginForm from '../User/LoginForm';
import RegisterForm from '../User/RegisterForm';

const Home = () => {
  const rootStore = useContext(RootStoreContext);
  const { isLoggedIn, user } = rootStore.userStore;
  const { openModal } = rootStore.modalStore;
  const homePage =
    isLoggedIn && user ? (
      <Aux>
        <Header as='h2' inverted content={`Welcome back ${user.displayName}`} />
        <Button as={Link} to='/activities' size='huge' inverted>
          Go to activities
        </Button>
      </Aux>
    ) : (
      <Aux>
        <Header as='h2' inverted content='Welcome to Reactivities' />
        <Button onClick={() => openModal(<LoginForm />)} size='huge' inverted>
          Login
        </Button>
        <Button
          onClick={() => openModal(<RegisterForm />)}
          size='huge'
          inverted
        >
          Register
        </Button>
      </Aux>
    );
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image
            size='massive'
            src='/assets/logo.png'
            alt='logo'
            style={{ marginBottom: 12 }}
          />
          Reactivities
        </Header>
        {homePage}
      </Container>
    </Segment>
  );
};

export default Home;
