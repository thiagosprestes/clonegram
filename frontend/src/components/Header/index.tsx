import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Container, Title } from './styles';
import { TextType } from '../Text';

interface HeaderProps {
  onBack: () => void;
  title: string;
}

const Header = ({ onBack, title }: HeaderProps) => (
  <Container>
    <AntDesign
      name='arrowleft'
      size={28}
      color='black'
      onPress={onBack}
      style={{ marginRight: 10 }}
    />
    <Title type={TextType.bold} size={22}>
      {title}
    </Title>
  </Container>
);

export default Header;
