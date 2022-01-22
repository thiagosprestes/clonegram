import styled from 'styled-components/native';
import { Container as SafeAreaView } from '~/components/SafeAreaView/styles';
import { colors, fonts } from '~/styleguide';

export const Container = styled(SafeAreaView)`
  padding: 20px;
  margin-top: 0px;
`;

export const Input = styled.TextInput`
  background-color: ${(props) => props.theme.colors.input};
  font-family: ${fonts.regular};
  border-radius: 7px;
  margin-bottom: 10px;
  padding: 15px;
  color: ${(props) => props.theme.colors.inputText};
`;
