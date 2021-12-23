import React from 'react';
import { Container, Username, UserPicture } from './styles';
import { TextType } from '~/components/Text';
import { api } from '~/services/api';

interface PostCommentItem {
  username: string;
  userPicture: string;
}

const PostCommentItem = ({ username, userPicture }: PostCommentItem) => {
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

export default PostCommentItem;
