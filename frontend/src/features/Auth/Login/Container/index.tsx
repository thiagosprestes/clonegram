import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageSourcePropType,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
  Container,
  SignUpText,
  Input,
  LoginButton,
  LoginForm,
  Logo,
  LoginButtonText,
  DarkModeToggle,
  ModalButton,
  ModalButtonText,
  ModalContainer,
  ModalContent,
  ModalTitle,
  ModalFooter,
  ModalBody,
} from './styles';

import logo from '~/assets/logo.png';
import logoWhite from '~/assets/logoWhite.png';
import { TextType } from '~/components/Text';
import { Theme } from '~/hooks/useTheme';
import { ThemeName } from '~/models/theme';
import { ApiStates } from '~/models/apiStates';
import Modal from '~/components/Modal';
import { colors } from '~/styleguide';

interface LoginProps {
  onToggleTheme: () => void;
  theme: Theme;
  onLogin: (username: string, password: string) => void;
  state: ApiStates;
  onCloseModal: () => void;
  onGoToSignUp: () => void;
}

const Login = function ({
  onToggleTheme,
  theme,
  onLogin,
  state,
  onCloseModal,
  onGoToSignUp,
}: LoginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSelectLogo = (): ImageSourcePropType => {
    const selectedLogo = theme.name === ThemeName.light ? logo : logoWhite;

    return selectedLogo;
  };

  return (
    <Container behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar
        translucent
        backgroundColor='transparent'
        barStyle={
          theme.name === ThemeName.dark ? 'light-content' : 'dark-content'
        }
      />

      <Logo source={onSelectLogo()} resizeMode='contain' />
      <LoginForm>
        <Input
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Usuário'
          placeholderTextColor={theme.colors.inputText}
          onChangeText={(text) => setUsername(text)}
        />
        <Input
          autoCorrect={false}
          autoCapitalize='none'
          placeholder='Senha'
          secureTextEntry
          placeholderTextColor={theme.colors.inputText}
          onChangeText={(text) => setPassword(text)}
        />
        <LoginButton
          disabled={username === '' || password === ''}
          isDisabled={username === '' || password === ''}
          onPress={() => onLogin(username, password)}
        >
          {state === ApiStates.loading ? (
            <ActivityIndicator color={colors.white} />
          ) : (
            <LoginButtonText type={TextType.bold} size={16}>
              Entrar
            </LoginButtonText>
          )}
        </LoginButton>
        <TouchableOpacity onPress={onGoToSignUp}>
          <SignUpText>Cadastre-se</SignUpText>
        </TouchableOpacity>
      </LoginForm>
      <DarkModeToggle onPress={onToggleTheme}>
        {
          {
            [ThemeName.dark]: <Feather name='sun' size={32} color='white' />,
            [ThemeName.light]: <Feather name='moon' size={32} color='black' />,
          }[theme.name]
        }
      </DarkModeToggle>
      <Modal isVisible={state === ApiStates.error}>
        <ModalContainer>
          <ModalBody>
            <ModalTitle size={16} type={TextType.bold}>
              Erro ao entrar
            </ModalTitle>
            <ModalContent size={12}>Usuário ou senha incorretos</ModalContent>
          </ModalBody>
          <ModalFooter>
            <ModalButton onPress={onCloseModal}>
              <ModalButtonText size={12}>Tentar novamente</ModalButtonText>
            </ModalButton>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    </Container>
  );
};

export default Login;
