import React from 'react';
import { View } from 'react-native';
import Button, { ButtonType } from '~/components/Button';
import { TextType } from '~/components/Text';

import { ButtonsContainer, Container, Description, Name } from './styles';

const Bio: React.FC = () => {
  return (
    <Container>
      <Name type={TextType.bold} size={16}>
        Teste
      </Name>
      <Description>VRAU</Description>
      <ButtonsContainer>
        <Button
          text='Seguir'
          onPress={() => undefined}
          type={ButtonType.primary}
        />
        <View style={{ marginRight: 12 }} />
        <Button
          text='Mensagem'
          onPress={() => undefined}
          type={ButtonType.secondary}
        />
      </ButtonsContainer>
    </Container>
  );
};

export default Bio;
