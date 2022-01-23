import React from 'react';
import { View } from 'react-native';
import { SignUpStep } from '~/features/Auth/SignUp/Container';
import { States } from '~/models/states';

import { ErrorMessage, Input as InputContainer } from './styles';

interface InputProps {
  autoFocus: boolean;
  errorMessage?: string;
  fieldValue: string;
  onChangeFieldValue: (value: string) => void;
  placeholder?: string;
  state?: States;
  step?: SignUpStep;
}

const Input = ({
  autoFocus,
  errorMessage,
  fieldValue,
  onChangeFieldValue,
  placeholder,
  state,
  step,
}: InputProps) => {
  return (
    <>
      <InputContainer
        autoCapitalize='none'
        onChangeText={onChangeFieldValue}
        autoCorrect={false}
        autoFocus={autoFocus}
        hasFieldError={state === States.error}
        keyboardType={step === SignUpStep.email ? 'email-address' : 'default'}
        placeholder={placeholder}
        secureTextEntry={step === SignUpStep.password}
        textContentType={step === SignUpStep.email ? 'emailAddress' : 'none'}
        value={fieldValue}
      />
      {errorMessage !== '' && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </>
  );
};

export default Input;
