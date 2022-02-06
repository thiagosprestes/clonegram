import React from 'react';
import { Camera as CameraType, CameraDevice } from 'react-native-vision-camera';

import { Container, RNCamera, TakePhoto } from './styles';

interface CameraProps {
  cameraRef: React.RefObject<CameraType>;
  device?: CameraDevice;
  onTakePhoto: () => void;
}

const Camera = ({ cameraRef, device, onTakePhoto }: CameraProps) => {
  return (
    <Container>
      <RNCamera device={device!} isActive photo ref={cameraRef} />
      <TakePhoto onPress={onTakePhoto} />
    </Container>
  );
};

export default Camera;
