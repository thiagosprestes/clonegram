import React from 'react';
import { States } from '~/models/states';
import Step from '../components/Step';
import { Container } from './styles';

export enum SignUpStep {
  username = 'username',
  email = 'email',
  password = 'password',
}

interface SignUpProps {
  email: string;
  invalidFieldMessage: string;
  onChangeFieldValue: (value: string) => void;
  onNext: () => void;
  password: string;
  state: States;
  step: SignUpStep;
  username: string;
}

const SignUp = ({
  email,
  invalidFieldMessage,
  onChangeFieldValue,
  onNext,
  password,
  state,
  step,
  username,
}: SignUpProps) => {
  return (
    <Container>
      {
        {
          [SignUpStep.username]: (
            <Step
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
    </Container>
  );
};

export default SignUp;
