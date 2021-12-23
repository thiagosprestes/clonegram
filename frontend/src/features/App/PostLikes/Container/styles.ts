import styled from 'styled-components/native';
import { colors, fonts } from '~/styleguide';

export const Container = styled.View`
  flex: 1;
  background-color: ${colors.white};
  padding: 20px;
`;

export const Input = styled.TextInput`
  background-color: ${(props) => props.theme.colors.input};
  font-family: ${fonts.regular};
  border-radius: 7px;
  margin-bottom: 10px;
  padding: 15px;
  color: ${(props) => props.theme.colors.inputText};
`;
