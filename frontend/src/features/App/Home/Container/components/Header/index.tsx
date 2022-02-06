import React from 'react';
import { Container, Logo, Options, IconWrapper } from './styles';

import logo from '~/assets/logo.png';
import NewPost from '~/assets/icons/NewPost.svg';
import Heart from '~/assets/icons/Heart.svg';
import Share from '~/assets/icons/Share.svg';

interface HeaderProps {
  onOpenCamera: () => void;
}

const Header = ({ onOpenCamera }: HeaderProps) => (
  <Container>
    <Logo source={logo} resizeMode='contain' />
    <Options>
      <IconWrapper onPress={onOpenCamera}>
        <NewPost height={28} width={28} />
      </IconWrapper>
      <IconWrapper>
        <Heart height={28} width={28} />
      </IconWrapper>
      <IconWrapper>
        <Share height={28} width={28} />
      </IconWrapper>
    </Options>
  </Container>
);

export default Header;
