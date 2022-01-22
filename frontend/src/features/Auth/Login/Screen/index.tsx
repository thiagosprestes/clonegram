import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Login from '~/features/Auth/Login/Container';
import { useTheme } from '~/hooks/useTheme';
import { ApiStates } from '~/models/apiStates';
import { storeAuthData } from '~/redux/slices/authSlice';
import { Routes } from '~/routes/appRoutes';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import { login } from '~/services/login';

interface LoginScreenProps {
  navigation: NativeStackNavigationProp<AppNavigationRouteParams>;
}

const LoginScreen = ({ navigation }: LoginScreenProps) => {
  const [state, setState] = useState(ApiStates.default);
  const dispatch = useDispatch();

  const { toggleTheme, theme } = useTheme();

  const handleToggleTheme = () => {
    toggleTheme();
  };

  const handleOnLogin = async (username: string, password: string) => {
    try {
      setState(ApiStates.loading);

      const authData = await login(username, password);

      dispatch(storeAuthData(authData));

      api.defaults.headers.common['Authorization'] = `Bearer ${authData.token}`;

      setState(ApiStates.default);
    } catch (error) {
      setState(ApiStates.error);
    }
  };

  const handleOnGoToSignUp = () => {
    navigation.navigate(Routes.SignUp);
  };

  return (
    <Login
      onToggleTheme={handleToggleTheme}
      theme={theme}
      onLogin={handleOnLogin}
      state={state}
      onCloseModal={() => setState(ApiStates.default)}
      onGoToSignUp={handleOnGoToSignUp}
    />
  );
};

export default LoginScreen;
