import React, { useState } from 'react';
import { States } from '~/models/states';
import IsEmailValid from '~/utils/validateEmail';
import SignUp, { SignUpStep } from '../Container';

const SignUpScreen = () => {
  const [step, setStep] = useState(SignUpStep.username);
  const [state, setState] = useState(States.default);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidFieldMessage, setInvalidFieldMessage] = useState('');

  const handleOnChangeFieldValue = (value: string) => {
    setState(States.default);
    setInvalidFieldMessage('');

    switch (step) {
      case SignUpStep.username:
        setUsername(value);
        break;
      case SignUpStep.email:
        setEmail(value);
        break;
      case SignUpStep.password:
        setPassword(value);
        break;
      default:
        break;
    }
  };

  const verifyUsername = async () => {
    // setState(States.error);
    // setInvalidFieldMessage('Este nome de usuário já está sendo utilizado');
    setStep(SignUpStep.email);
  };

  const verifyEmail = async () => {
    const isEmailValid = IsEmailValid(email);

    if (!isEmailValid) {
      setState(States.error);
      setInvalidFieldMessage('Insira um email em um formato válido');
      return;
    }

    setStep(SignUpStep.password);
  };

  const finishSignUp = async () => {};

  const handleOnNext = () => {
    switch (step) {
      case SignUpStep.username:
        verifyUsername();
        break;
      case SignUpStep.email:
        verifyEmail();
        break;
      case SignUpStep.password:
        finishSignUp();
        break;
      default:
        break;
    }
  };

  return (
    <SignUp
      email={email}
      password={password}
      invalidFieldMessage={invalidFieldMessage}
      onChangeFieldValue={handleOnChangeFieldValue}
      onNext={handleOnNext}
      state={state}
      step={step}
      username={username}
    />
  );
};

export default SignUpScreen;
