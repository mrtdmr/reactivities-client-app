import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';

const Navigation = props => {
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header>
          <img
            src={`/assets/logo.png`}
            alt='Reactivities'
            style={{ marginRight: '10px' }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' />
        <Menu.Item name='friends'>
          <Button
            positive
            content='Create Activity'
            onClick={props.openCreateForm}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navigation;
