import styled from 'styled-components/native';
import { colors } from '~/styleguide';
import { ButtonType } from '.';
import Text from '../Text';

interface ButtonProps {
  buttonType: ButtonType;
  isDisabled?: boolean;
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
  padding: 16px 30px;
  height: auto;
  opacity: ${(props) => (props.isDisabled ? 0.6 : 1)};
  width: 100%;
`;

export const ButtonText = styled(Text)<ButtonProps>`
  color: ${(props) =>
    props.buttonType === ButtonType.primary ? colors.white : colors.black};
  font-weight: bold;
`;
