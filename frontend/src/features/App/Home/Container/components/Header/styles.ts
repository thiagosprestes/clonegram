import styled from 'styled-components/native';
import { StatusBar } from 'react-native';
import { colors } from '~/styleguide';

export const Container = styled.View`
  background-color: ${(props) => props.theme.colors.primary};
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 120px;
  height: 40px;
`;

export const Options = styled.View`
  flex-direction: row;
`;

export const IconWrapper = styled.TouchableOpacity`
  margin-left: 15px;
`;
