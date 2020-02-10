import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import Logo from '../../assets/logo.png';

const Navigation = () => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <img src={Logo} alt='Reactivities' style={{ marginRight: '10px' }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item name='friends'>
          <Button positive content='Create Activity' />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navigation;
