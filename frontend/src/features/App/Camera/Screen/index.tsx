import React, { useEffect, useRef, useState } from 'react';
import Camera from '../Container';
import {
  Camera as RNCamera,
  useCameraDevices,
} from 'react-native-vision-camera';
import { Text, View } from 'react-native';

const CameraScreen = () => {
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [hasMicrophonePermission, setHasMicrophonePermission] = useState(false);

  const cameraRef = useRef<RNCamera>(null);

  const devices = useCameraDevices();
  const device = devices.back;

  const requestPermissions = async () => {
    await RNCamera.requestCameraPermission();
    await RNCamera.requestMicrophonePermission();
  };

  const verifyPermissions = async () => {
    const cameraPermission = await RNCamera.getCameraPermissionStatus();
    const microphonePermission = await RNCamera.getMicrophonePermissionStatus();

    setHasCameraPermission(cameraPermission === 'authorized');
    setHasMicrophonePermission(microphonePermission === 'authorized');
  };

  const handleOnTakePhoto = async () => {
    await cameraRef.current?.takePhoto({
      flash: 'on',
    });
  };

  useEffect(() => {
    requestPermissions();
    verifyPermissions();
  }, []);

  if (device == null || !hasCameraPermission || !hasMicrophonePermission)
    return <View />;

  return (
    <Camera
      cameraRef={cameraRef}
      device={device}
      onTakePhoto={handleOnTakePhoto}
    />
  );
};

export default CameraScreen;
