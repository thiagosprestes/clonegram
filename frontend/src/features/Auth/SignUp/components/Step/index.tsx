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
  Back,
  BackText,
} from './styles';

interface StepProps {
  fieldValue: string;
  state: States;
  invalidFieldMessage: string;
  onBack: () => void;
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
  onBack,
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
    <Back onPress={onBack}>
      <BackText type={TextType.bold}>Voltar</BackText>
    </Back>
  </Container>
);

export default Step;
