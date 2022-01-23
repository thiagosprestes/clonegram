import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { States } from '~/models/states';
import { storeAuthData } from '~/redux/slices/authSlice';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import { login } from '~/services/login';
import { log } from '~/utils/log';
import IsEmailValid from '~/utils/validateEmail';
import SignUp, { SignUpStep } from '../Container';

interface SignUpScreenProps {
  navigation: NativeStackNavigationProp<AppNavigationRouteParams>;
}

const SignUpScreen = ({ navigation }: SignUpScreenProps) => {
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
    setState(States.loading);

    const { data: isUsernameAlreadyInUse } = await api.get<boolean>(
      `/users/verify-username/${username}`
    );

    if (isUsernameAlreadyInUse) {
      setState(States.error);
      setInvalidFieldMessage('Este nome de usuário já está sendo utilizado');
      return;
    }

    setState(States.default);
    setStep(SignUpStep.email);
  };

  const verifyEmail = async () => {
    const isEmailValid = IsEmailValid(email);

    if (!isEmailValid) {
      setState(States.error);
      setInvalidFieldMessage('Insira um email em um formato válido');
      return;
    }

    setState(States.loading);

    const { data: isEmailAlreadyInUse } = await api.get<boolean>(
      `/users/verify-email/${email}`
    );

    if (isEmailAlreadyInUse) {
      setState(States.error);
      setInvalidFieldMessage('Este email já está sendo utilizado');
      return;
    }

    setState(States.default);
    setStep(SignUpStep.password);
  };

  const finishSignUp = async () => {
    try {
      setState(States.loading);

      await api.post('/users', {
        username,
        email,
        password,
      });

      setIsAccountCreatedModalVisible(true);
    } catch (error: any) {
      log.e('Auth/SignUp', error.response);
      setState(States.default);
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

  const handleOnBack = () => {
    switch (step) {
      case SignUpStep.username:
        navigation.goBack();
        break;
      case SignUpStep.email:
        setStep(SignUpStep.username);
        break;
      case SignUpStep.password:
        setStep(SignUpStep.email);
      default:
        break;
    }
  };

  return (
    <SignUp
      email={email}
      password={password}
      invalidFieldMessage={invalidFieldMessage}
      isAccountCreatedModalVisible={isAccountCreatedModalVisible}
      onBack={handleOnBack}
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
