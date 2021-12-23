import React from 'react';
import { TextProps } from 'react-native';
import { useTheme } from 'styled-components';
import { TextContainer } from './styles';

export enum TextType {
  regular = 'regular',
  bold = 'bold',
}

interface TextComponentProps extends TextProps {
  children?: React.ReactNode;
  type?: TextType;
  size?: number;
  color?: string;
}

const Text = ({
  children,
  type = TextType.regular,
  size = 14,
  color,
  ...otherProps
}: TextComponentProps) => {
  const { colors } = useTheme();

  return (
    <TextContainer
      type={type}
      size={size}
      color={color || colors.textPrimary}
      {...otherProps}
    >
      {children}
    </TextContainer>
  );
};

export default Text;
