import React from 'react';
import { TextType } from '../Text';
import { Container, EmptyContentText } from './styles';

interface EmptyContentProps {
  text: string;
}

const EmptyContent = ({ text }: EmptyContentProps) => {
  return (
    <Container>
      <EmptyContentText type={TextType.bold} size={20}>
        {text}
      </EmptyContentText>
    </Container>
  );
};

export default EmptyContent;
