import React from 'react';
import { ActivityIndicator, StyleProp } from 'react-native';
import { colors } from '~/styleguide';
import { Button as ButtonContainer, ButtonText } from './styles';

export enum ButtonType {
  primary = 'primary',
  secondary = 'secondary',
}

interface ButtonProps {
  isDisabled?: boolean;
  isLoading?: boolean;
  onPress: () => void;
  style?: StyleProp<any>;
  text: string;
  type: ButtonType;
}

const Button = ({
  isDisabled,
  isLoading,
  onPress,
  style,
  text,
  type,
}: ButtonProps) => (
  <ButtonContainer
    onPress={onPress}
    buttonType={type}
    isDisabled={isDisabled}
    disabled={isDisabled}
    style={style}
  >
    {isLoading ? (
      <ActivityIndicator size={22} color={colors.white} />
    ) : (
      <ButtonText size={16} buttonType={type}>
        {text}
      </ButtonText>
    )}
  </ButtonContainer>
);

export default Button;
