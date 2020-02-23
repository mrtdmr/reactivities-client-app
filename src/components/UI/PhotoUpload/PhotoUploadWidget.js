import React, { Fragment, useState, useEffect } from 'react';
import { Header, Grid, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import PhotoWidgetDropZone from './PhotoWidgetDropZone';
import PhotoWidgetCropper from './PhotoWidgetCropper';
import Aux from '../../../hoc/Auxiliary/Auxiliary';

const PhotoUploadWidget = props => {
  const [files, setFiles] = useState([]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    return () => {
      files.forEach(file => URL.revokeObjectURL(file.preview));
    };
  });

  return (
    <Fragment>
      <Grid>
        <Grid.Column width={4}>
          <Header color='teal' sub content='Step 1 - Add Photo' />
          <PhotoWidgetDropZone setFiles={setFiles} />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 2 - Resize image' />
          {files.length > 0 && (
            <PhotoWidgetCropper
              setImage={setImage}
              imagePreview={files[0].preview}
            />
          )}
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
          <Header sub color='teal' content='Step 3 - Preview & Upload' />
          {files.length > 0 && (
            <Aux>
              <div
                className='img-preview'
                style={{ minHeight: '200px', overflow: 'hidden' }}
              />
              <Button.Group widths={2}>
                <Button
                  positive
                  icon='check'
                  loading={props.loading}
                  onClick={() => props.uploadPhoto(image)}
                />
                <Button
                  icon='close'
                  disabled={props.loading}
                  onClick={() => setFiles([])}
                />
              </Button.Group>
            </Aux>
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default observer(PhotoUploadWidget);
