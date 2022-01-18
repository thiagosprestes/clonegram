import React from 'react';
import { Container, Username, UserPicture } from './styles';
import { TextType } from '~/components/Text';
import { api } from '~/services/api';

interface UsersListItemProps {
  username: string;
  userPicture: string;
}

const UsersListItem = ({ username, userPicture }: UsersListItemProps) => {
  return (
    <Container>
      <UserPicture
        source={{ uri: `${api.defaults.baseURL}/images/${userPicture}` }}
      />
      <Username type={TextType.bold} size={16}>
        {username}
      </Username>
    </Container>
  );
};

export default UsersListItem;
