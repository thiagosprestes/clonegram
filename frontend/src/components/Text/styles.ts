import styled from 'styled-components/native';
import { fonts } from '~/styleguide';
import { TextType } from '.';

interface TextContainerProps {
  type: TextType;
  size: number;
  color?: string;
}

export const Container = styled.View``;

export const TextContainer = styled.Text<TextContainerProps>`
  font-family: ${(props) => fonts[props.type]};
  font-size: ${(props) => props.size}px;
  color: ${(props) => props.color};
`;
