import React from 'react';
import { Container, ProfilePicture } from './styles';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { States } from '~/models/states';
import Loading from '~/components/Loading';
import Error from '~/components/Error';
import { PostResponse } from '~/models/post';
import EmptyContent from '~/components/EmptyContent';
import ImageComponent from '~/components/Image';
import profile from '~/assets/profile.png';
import Button, { ButtonType } from '~/components/Button';
import Input from '~/components/Input';

interface EditProfileProps {
  bio: string;
  email: string;
  emailError: string;
  onChangeBio: (value: string) => void;
  onChangeUsername: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangePassword: (value: string) => void;
  onUpdate: () => void;
  password: string;
  passwordError: string;
  state: States;
  username: string;
  usernameError: string;
}

const EditProfile = ({
  bio,
  email,
  emailError,
  onChangeBio,
  onChangeUsername,
  onChangeEmail,
  onChangePassword,
  onUpdate,
  password,
  passwordError,
  state,
  username,
  usernameError,
}: EditProfileProps) => {
  return (
    <Container>
      <ScrollView>
        <ProfilePicture imageSource={profile} size={50} isRounded />
        <Input
          autoFocus={false}
          fieldValue={username}
          onChangeFieldValue={onChangeUsername}
          placeholder='Nome de usuário'
          errorMessage={usernameError}
          state={usernameError !== '' ? States.error : States.default}
        />
        <Input
          autoFocus={false}
          fieldValue={email}
          onChangeFieldValue={onChangeEmail}
          placeholder='Email'
          errorMessage={emailError}
          state={emailError !== '' ? States.error : States.default}
        />
        <Input
          autoFocus={false}
          fieldValue={password}
          onChangeFieldValue={onChangePassword}
          placeholder='Senha'
          errorMessage={password && password.length < 6 ? passwordError : ''}
          state={passwordError !== '' ? States.error : States.default}
        />
        <Input
          autoFocus={false}
          fieldValue={bio}
          onChangeFieldValue={onChangeBio}
          placeholder='Biografia'
        />
        <Button
          isLoading={state === States.loading}
          isDisabled={state === States.loading}
          onPress={onUpdate}
          text='Editar'
          type={ButtonType.primary}
        />
      </ScrollView>
    </Container>
  );
};

export default EditProfile;
