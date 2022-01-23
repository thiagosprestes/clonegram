import React from 'react';
import { Modal as ModalWrapper } from 'react-native';

import { Container } from './styles';

interface ModalProps {
  children: React.ReactNode;
  isVisible: boolean;
}

const Modal = ({ children, isVisible }: ModalProps) => {
  return (
    <ModalWrapper transparent visible={isVisible}>
      <Container>{children}</Container>
    </ModalWrapper>
  );
};

export default Modal;
