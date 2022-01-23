import styled from 'styled-components/native';
import { fonts, colors } from '~/styleguide';
import Text from '../Text';

interface InputProps {
  hasFieldError: boolean;
}

export const Input = styled.TextInput<InputProps>`
  background-color: ${(props) => props.theme.colors.input};
  font-family: ${fonts.regular};
  border-radius: 7px;
  margin: 12px 0px;
  padding: 15px;
  color: ${(props) => props.theme.colors.inputText};
  border: ${(props) =>
    props.hasFieldError ? `2px solid ${colors.primaryRed}` : 'none'};
`;

export const ErrorMessage = styled(Text)`
  color: ${colors.primaryRed};
`;
