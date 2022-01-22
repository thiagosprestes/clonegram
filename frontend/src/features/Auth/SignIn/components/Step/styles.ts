import styled from 'styled-components/native';
import Button from '~/components/Button';
import Text from '~/components/Text';
import { colors } from '~/styleguide';
import { fonts } from '~/styleguide/fonts';

interface InputProps {
  hasFieldError: boolean;
}

export const Container = styled.View`
  flex: 1;
`;

export const Title = styled(Text)`
  align-self: center;
  text-align: center;
  width: 250px;
`;

export const Subtitle = styled(Text)`
  align-self: center;
  text-align: center;
  color: ${colors.lightGreyText};
  width: 250px;
`;

export const Input = styled.TextInput<InputProps>`
  background-color: ${(props) => props.theme.colors.input};
  font-family: ${fonts.regular};
  border-radius: 7px;
  margin: 20px 0px;
  padding: 15px;
  color: ${(props) => props.theme.colors.inputText};
  border: ${(props) =>
    props.hasFieldError ? `2px solid ${colors.primaryRed}` : 'none'};
`;

export const NextButton = styled(Button)``;

export const Message = styled(Text)`
  color: ${colors.primaryRed};
  margin-bottom: 20px;
`;
