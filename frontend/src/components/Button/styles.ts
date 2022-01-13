import styled from 'styled-components/native';
import { colors } from '~/styleguide';
import { ButtonType } from '.';
import Text from '../Text';

interface ButtonProps {
  buttonType: ButtonType;
}

export const Button = styled.TouchableOpacity<ButtonProps>`
  align-items: center;
  background-color: ${(props) =>
    props.buttonType === ButtonType.primary ? colors.blue : colors.white};
  border: ${(props) =>
    props.buttonType === ButtonType.primary
      ? '0px'
      : `1px solid ${colors.secondaryGrey}`};
  border-radius: 5px;
  flex: 1;
  padding: 7px 30px;
`;

export const ButtonText = styled(Text)<ButtonProps>`
  color: ${(props) =>
    props.buttonType === ButtonType.primary ? colors.white : colors.black};
  font-weight: bold;
`;
