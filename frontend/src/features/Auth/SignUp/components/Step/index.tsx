import React from 'react';
import { ButtonType } from '~/components/Button';
import { TextType } from '~/components/Text';
import { States } from '~/models/states';
import { SignUpStep } from '../../Container';
import {
  Container,
  Title,
  Subtitle,
  Input,
  NextButton,
  Message,
} from './styles';

interface StepProps {
  fieldValue: string;
  state: States;
  invalidFieldMessage: string;
  onChangeFieldValue: (value: string) => void;
  onNext: () => void;
  title: string;
  subtitle?: string;
  step: SignUpStep;
}

const Step = ({
  fieldValue,
  state,
  invalidFieldMessage,
  onChangeFieldValue,
  onNext,
  title,
  subtitle,
  step,
}: StepProps) => (
  <Container>
    <Title size={28} type={TextType.bold}>
      {title}
    </Title>
    <Subtitle size={18}>{subtitle}</Subtitle>
    <Input
      hasFieldError={state === States.error}
      value={fieldValue}
      onChangeText={onChangeFieldValue}
      autoCorrect={false}
      autoCapitalize='none'
      autoFocus
      keyboardType={step === SignUpStep.email ? 'email-address' : 'default'}
      textContentType={step === SignUpStep.email ? 'emailAddress' : 'none'}
      secureTextEntry={step === SignUpStep.password}
    />
    {invalidFieldMessage !== '' && (
      <Message size={16}>{invalidFieldMessage}</Message>
    )}
    <NextButton
      onPress={onNext}
      text='Avançar'
      type={ButtonType.primary}
      isDisabled={
        fieldValue === '' ||
        (step === SignUpStep.password && fieldValue.length < 6) ||
        state === States.loading
      }
      isLoading={state === States.loading}
    />
  </Container>
);

export default Step;
