import React, { useContext } from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import ActivityStore from '../../stores/activityStore';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

const Navigation = props => {
  const activityStore = useContext(ActivityStore);
  return (
    <Menu fixed='top' inverted>
      <Container>
        <Menu.Item header as={NavLink} to='/' exact>
          <img
            src={`/assets/logo.png`}
            alt='Reactivities'
            style={{ marginRight: '10px' }}
          />
          Reactivities
        </Menu.Item>
        <Menu.Item name='Activities' as={NavLink} to='/activities' />
        <Menu.Item name='friends'>
          <Button
            as={NavLink}
            to='/create-activity'
            positive
            content='Create Activity'
            onClick={activityStore.openCreateForm}
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navigation);
