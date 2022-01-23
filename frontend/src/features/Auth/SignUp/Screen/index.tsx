import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { States } from '~/models/states';
import { storeAuthData } from '~/redux/slices/authSlice';
import { api } from '~/services/api';
import { login } from '~/services/login';
import { log } from '~/utils/log';
import IsEmailValid from '~/utils/validateEmail';
import SignUp, { SignUpStep } from '../Container';

const SignUpScreen = () => {
  const [step, setStep] = useState(SignUpStep.username);
  const [state, setState] = useState(States.default);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [invalidFieldMessage, setInvalidFieldMessage] = useState('');
  const [isAccountCreatedModalVisible, setIsAccountCreatedModalVisible] =
    useState(false);

  const dispatch = useDispatch();

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
    const { data: isUsernameAlreadyInUse } = await api.get<boolean>(
      `/users/verify-username/${username}`
    );

    if (isUsernameAlreadyInUse) {
      setState(States.error);
      setInvalidFieldMessage('Este nome de usuário já está sendo utilizado');
      return;
    }

    setStep(SignUpStep.email);
  };

  const verifyEmail = async () => {
    const isEmailValid = IsEmailValid(email);

    if (!isEmailValid) {
      setState(States.error);
      setInvalidFieldMessage('Insira um email em um formato válido');
      return;
    }

    const { data: isEmailAlreadyInUse } = await api.get<boolean>(
      `/users/verify-email/${email}`
    );

    if (isEmailAlreadyInUse) {
      setState(States.error);
      setInvalidFieldMessage('Este email já está sendo utilizado');
      return;
    }

    setStep(SignUpStep.password);
  };

  const finishSignUp = async () => {
    try {
      await api.post('/users', {
        username,
        email,
        password,
      });

      setIsAccountCreatedModalVisible(true);
    } catch (error: any) {
      log.e('Auth/SignUp', error.response);
    }
  };

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

  const handleOnCloseModal = async () => {
    const authData = await login(username, password);

    dispatch(storeAuthData(authData));

    api.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;

    setIsAccountCreatedModalVisible(false);
  };

  return (
    <SignUp
      email={email}
      password={password}
      invalidFieldMessage={invalidFieldMessage}
      isAccountCreatedModalVisible={isAccountCreatedModalVisible}
      onChangeFieldValue={handleOnChangeFieldValue}
      onCloseModal={handleOnCloseModal}
      onNext={handleOnNext}
      state={state}
      step={step}
      username={username}
    />
  );
};

export default SignUpScreen;
