import { Camera } from 'react-native-vision-camera';
import styled from 'styled-components/native';
import { colors } from '~/styleguide';

export const Container = styled.View`
  flex: 1;
`;

export const RNCamera = styled(Camera)`
  flex: 1;
`;

export const TakePhoto = styled.TouchableOpacity`
  height: 67px;
  width: 67px;
  background-color: transparent;
  position: absolute;
  bottom: 0;
  align-self: center;
  margin-bottom: 50px;
  border-radius: 50px;
  border: 5px solid ${colors.white};
`;
