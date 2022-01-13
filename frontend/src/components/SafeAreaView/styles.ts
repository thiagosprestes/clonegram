import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { colors } from '~/styleguide';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.white};
  margin-top: ${StatusBar.currentHeight}px;
`;
