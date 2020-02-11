import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Loading = props => {
  return (
    <Dimmer active inverted={props.inverted}>
      <Loader content={props.content} />
    </Dimmer>
  );
};

export default Loading;
