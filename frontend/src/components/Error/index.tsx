import React from 'react';
import Text, { TextType } from '../Text';

import { Button, ButtonText, Container } from './styles';

interface ErrorProps {
  onRetry: () => void;
}

const Error = ({ onRetry }: ErrorProps) => (
  <Container>
    <Text type={TextType.bold} size={20}>
      Ops! Ocorreu um erro :(
    </Text>
    <Button onPress={onRetry}>
      <ButtonText type={TextType.bold} size={16}>
        Tentar novamente
      </ButtonText>
    </Button>
  </Container>
);

export default Error;
