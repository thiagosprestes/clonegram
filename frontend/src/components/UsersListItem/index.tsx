import React from 'react';
import { Container, Username, UserPicture } from './styles';
import { TextType } from '~/components/Text';
import { api } from '~/services/api';
import profile from '~/assets/profile.png';

interface UsersListItemProps {
  username: string;
  userPicture: string;
}

const UsersListItem = ({ username, userPicture }: UsersListItemProps) => {
  return (
    <Container>
      <UserPicture
        source={
          userPicture
            ? { uri: `${api.defaults.baseURL}/images/${userPicture}` }
            : profile
        }
      />
      <Username type={TextType.bold} size={16}>
        {username}
      </Username>
    </Container>
  );
};

export default UsersListItem;
