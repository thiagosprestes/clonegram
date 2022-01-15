import React from 'react';
import { Container, Description, PostUserProfilePicture } from './styles';
import Text, { TextType } from '~/components/Text';

interface PostCommentItem {
  comment: string;
  isDescription?: boolean;
  username: string;
  userPicture: string;
}

const PostCommentItem = ({
  comment,
  isDescription,
  username,
  userPicture,
}: PostCommentItem) => {
  return (
    <Container isDescription={isDescription ?? false}>
      <PostUserProfilePicture
        imageSource={userPicture}
        size={30}
        isRounded={true}
      />
      <Text type={TextType.bold} size={12} style={{ marginLeft: 6 }}>
        {username}
      </Text>
      <Description size={12}>{comment}</Description>
    </Container>
  );
};

export default PostCommentItem;
