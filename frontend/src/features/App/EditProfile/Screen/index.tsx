import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { useAppSelector } from '~/hooks/redux';
import { PostResponse } from '~/models/post';
import { States } from '~/models/states';
import { Routes } from '~/routes/appRoutes';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import Profile from '../Container';
import { AntDesign } from '@expo/vector-icons';
import { removeAuthData } from '~/redux/slices/authSlice';
import { useDispatch } from 'react-redux';
import EditProfile from '../Container';
import { User } from '~/models/user';
import IsEmailValid from '~/utils/validateEmail';
import { log } from '~/utils/log';

interface EditProfileScreenProps {
  navigation: NativeStackNavigationProp<AppNavigationRouteParams>;
  route: RouteProp<AppNavigationRouteParams, Routes.Profile>;
}

const EditProfileScreen = ({ navigation, route }: EditProfileScreenProps) => {
  const [state, setState] = useState(States.default);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [bio, setBio] = useState('');

  const { userId } = route.params;

  const handleOnGetUser = async () => {
    const { data } = await api.get(`/user/${userId}`);

    setUsername(data.username);
    setEmail(data.email);
  };

  const handleOnChangeUsername = (value: string) => {
    if (usernameError !== '') setUsernameError('');

    setUsername(value);
  };

  const handleOnChangeEmail = (value: string) => {
    if (emailError !== '') setEmailError('');

    setEmail(value);
  };

  const handleOnChangePassword = (value: string) => {
    if (passwordError !== '') setPasswordError('');

    setPassword(value);
  };

  const handleOnUpdate = async () => {
    if (password !== '' && password.length < 6) {
      setPasswordError('Sua senha deve ter no mínimo 6 caracteres');
      return;
    }

    try {
      setState(States.loading);

      await api.put(`/users/${userId}`, {
        username,
        email,
        password,
        bio,
      });

      navigation.goBack();
    } catch (error: any) {
      log.e('App/EditProfile', error.response.data);

      setState(States.default);

      const { field } = error.response.data;

      if (field === 'username') {
        setState(States.error);
        setUsernameError('Este nome de usuário já está sendo utilizado');
      }

      if (field === 'email') {
        setState(States.error);
        setEmailError('Este email já está sendo utilizado');
      }
    }
  };

  useEffect(() => {
    handleOnGetUser();
  }, []);

  return (
    <EditProfile
      bio={bio}
      email={email}
      emailError={emailError}
      onChangeBio={(value: string) => setBio(value)}
      onChangeUsername={handleOnChangeUsername}
      onChangeEmail={handleOnChangeEmail}
      onChangePassword={handleOnChangePassword}
      onUpdate={handleOnUpdate}
      password={password}
      passwordError={passwordError}
      state={state}
      username={username}
      usernameError={usernameError}
    />
  );
};

export default EditProfileScreen;
