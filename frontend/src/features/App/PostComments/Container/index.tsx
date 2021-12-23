import React from 'react';
import { FlatList } from 'react-native';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import { States } from '~/models/states';
import PostCommentItem from './components/PostCommentItem';
import {
  AddCommentContainer,
  Container,
  Input,
  PostDescription,
  SendComment,
  SendCommentText,
  UserPicture,
} from './styles';
import { Comment } from '~/models/comment';
import Text, { TextType } from '~/components/Text';

import sample from '~/assets/sample.jpg';

interface HomeProps {
  comment: string;
  comments: Comment[];
  onAddComment: () => void;
  onChangeComment: (search: string) => void;
  onRetry: () => void;
  postDescription: string;
  postUsername: string;
  state: States;
}

const PostComments = ({
  comment,
  comments,
  onAddComment,
  onChangeComment,
  onRetry,
  postDescription,
  postUsername,
  state,
}: HomeProps) => {
  const content = (
    <>
      <PostDescription>
        <Text type={TextType.bold}>{postUsername}</Text> {postDescription}
      </PostDescription>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }: { item: Comment }) => (
          <PostCommentItem username='a' userPicture='b' />
        )}
      />
      <AddCommentContainer>
        <UserPicture source={sample} />
        <Input
          value={comment}
          placeholder='Comentar'
          onChangeText={(text) => onChangeComment(text)}
        />
        <SendComment disabled={comment.length === 0}>
          <SendCommentText
            isDisabled={comment.length === 0}
            size={16}
            onPress={onAddComment}
          >
            Publicar
          </SendCommentText>
        </SendComment>
      </AddCommentContainer>
    </>
  );

  const loading = <Loading />;

  const error = <Error onRetry={onRetry} />;

  return (
    <Container>
      {
        {
          [States.default]: content,
          [States.loading]: loading,
          [States.error]: error,
        }[state]
      }
    </Container>
  );
};

export default PostComments;
