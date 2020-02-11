import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';

const Detail = props => {
  return (
    <Card fluid>
      <Image
        src={`/assets/categoryImages/${props.selectedAct.category}.jpg`}
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>{props.selectedAct.title}</Card.Header>
        <Card.Meta>
          <span>{props.selectedAct.date}</span>
        </Card.Meta>
        <Card.Description>{props.selectedAct.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button
            basic
            color='blue'
            content='Edit'
            onClick={() => props.setEditMode(true)}
          />
          <Button
            onClick={() => props.setSelectedActivity(null)}
            basic
            color='grey'
            content='Cancel'
          />
        </Button.Group>
      </Card.Content>
    </Card>
  );
};

export default Detail;
