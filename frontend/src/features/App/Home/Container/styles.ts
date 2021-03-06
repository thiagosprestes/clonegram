import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import Text from '~/components/Text';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.theme.colors.primary};
  margin-top: ${StatusBar.currentHeight}px;
`;
