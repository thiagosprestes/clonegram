import React from 'react';
import { Button as ButtonContainer, ButtonText } from './styles';

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

interface ButtonProps {
  onPress: () => void;
  text: string;
  type: ButtonType;
}

const Button = ({ onPress, text, type }: ButtonProps) => (
  <ButtonContainer onPress={onPress} buttonType={type}>
    <ButtonText size={16} buttonType={type}>
      {text}
    </ButtonText>
  </ButtonContainer>
);

export default Button;
