import React from 'react';
import { Tab } from 'semantic-ui-react';
import ProfilePhotos from './ProfilePhotos';
import ProfileFollowings from './ProfileFollowings';
import ProfileActivities from './ProfileActivities';

const panes = [
  { menuItem: 'About', render: () => <Tab.Pane>About content</Tab.Pane> },
  {
    menuItem: 'Photos',
    render: () => (
      <Tab.Pane>
        <ProfilePhotos />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Activities',
    render: () => (
      <Tab.Pane>
        <ProfileActivities />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Followers',
    render: () => (
      <Tab.Pane>
        <ProfileFollowings />
      </Tab.Pane>
    )
  },
  {
    menuItem: 'Following',
    render: () => (
      <Tab.Pane>
        <ProfileFollowings />
      </Tab.Pane>
    )
  }
];
const ProfileContent = props => {
  return (
    <Tab
      menu={{ fluid: true, vertical: true }}
      menuPosition='right'
      panes={panes}
      //activeIndex={1}
      onTabChange={(e, data) => props.setActiveTab(data.activeIndex)}
    />
  );
};

export default ProfileContent;
