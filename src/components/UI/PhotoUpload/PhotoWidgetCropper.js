import React, { useRef } from 'react';
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';

const PhotoWidgetCropper = props => {
  const cropper = useRef(null);
  const cropImage = () => {
    if (
      cropper.current &&
      typeof cropper.current.getCroppedCanvas() === 'undefined'
    )
      return;
    cropper &&
      cropper.current &&
      cropper.current.getCroppedCanvas().toBlob(blob => {
        props.setImage(blob);
      }, 'image/jpg');
  };
  return (
    <Cropper
      ref={cropper}
      src={props.imagePreview}
      style={{ height: 200, width: '100%' }}
      // Cropper.js options
      aspectRatio={1 / 1}
      guides={false}
      viewMode={1}
      dragMode='move'
      scalable={true}
      cropBoxMovable={true}
      cropBoxResizable={true}
      crop={cropImage}
      preview='.img-preview'
    />
  );
};

export default PhotoWidgetCropper;
