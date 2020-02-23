import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Icon, Header } from 'semantic-ui-react';

const dropZoneStyles = {
  border: 'dashed 3px',
  borderColor: '#eee',
  borderRadius: '5px',
  paddingTop: '30px',
  textAlign: 'center',
  height: '200px'
};
const dropZoneActive = {
  borderColor: 'green'
};

const PhotoWidgetDropZone = props => {
  const onDrop = useCallback(
    acceptedFiles => {
      props.setFiles(
        acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [props]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      style={
        isDragActive ? { ...dropZoneStyles, ...dropZoneActive } : dropZoneStyles
      }
    >
      <input {...getInputProps()} />
      <Icon name='upload' size='huge' />
      <Header content='Drop image here' />
    </div>
  );
};
export default PhotoWidgetDropZone;
