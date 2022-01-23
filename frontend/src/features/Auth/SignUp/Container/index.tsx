import React from 'react';
import Modal from '~/components/Modal';
import { TextType } from '~/components/Text';
import { States } from '~/models/states';
import Step from '../components/Step';
import {
  Container,
  ModalBody,
  ModalButton,
  ModalButtonText,
  ModalContent,
  ModalDescription,
  ModalTitle,
} from './styles';

export enum SignUpStep {
  username = 'username',
  email = 'email',
  password = 'password',
}

interface SignUpProps {
  isAccountCreatedModalVisible: boolean;
  email: string;
  invalidFieldMessage: string;
  onBack: () => void;
  onChangeFieldValue: (value: string) => void;
  onCloseModal: () => void;
  onNext: () => void;
  password: string;
  state: States;
  step: SignUpStep;
  username: string;
}

const SignUp = ({
  isAccountCreatedModalVisible,
  email,
  invalidFieldMessage,
  onBack,
  onChangeFieldValue,
  onCloseModal,
  onNext,
  password,
  state,
  step,
  username,
}: SignUpProps) => (
  <Container>
    {
      {
        [SignUpStep.username]: (
          <Step
            onBack={onBack}
            onChangeFieldValue={onChangeFieldValue}
            onNext={onNext}
            fieldValue={username}
            title='Escolha um nome de usuário'
            subtitle='Você podera alterá-lo depois'
            invalidFieldMessage={invalidFieldMessage}
            state={state}
            step={SignUpStep.username}
          />
        ),
        [SignUpStep.email]: (
          <Step
            onBack={onBack}
            onChangeFieldValue={onChangeFieldValue}
            onNext={onNext}
            fieldValue={email}
            title='Insira o seu endereço de email'
            subtitle='Você podera alterá-lo depois'
            invalidFieldMessage={invalidFieldMessage}
            state={state}
            step={SignUpStep.email}
          />
        ),
        [SignUpStep.password]: (
          <Step
            onBack={onBack}
            onChangeFieldValue={onChangeFieldValue}
            onNext={onNext}
            fieldValue={password}
            title='Escolha uma senha'
            subtitle='A sua senha deve conter no mínimo 6 caracteres'
            invalidFieldMessage={invalidFieldMessage}
            state={state}
            step={SignUpStep.password}
          />
        ),
      }[step]
    }
    <Modal isVisible={isAccountCreatedModalVisible}>
      <ModalContent>
        <ModalBody>
          <ModalTitle type={TextType.bold} size={18}>
            Bem vindo, {username}
          </ModalTitle>
          <ModalDescription>
            Sua conta foi criada com sucesso :)
          </ModalDescription>
        </ModalBody>
        <ModalButton onPress={onCloseModal}>
          <ModalButtonText type={TextType.bold}>Pronto</ModalButtonText>
        </ModalButton>
      </ModalContent>
    </Modal>
  </Container>
);

export default SignUp;
