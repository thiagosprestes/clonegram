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
  SendComment,
  SendCommentText,
  UserPicture,
} from './styles';
import { Comment } from '~/models/comment';

interface HomeProps {
  comment: string;
  comments: Comment[];
  onAddComment: () => void;
  onChangeComment: (search: string) => void;
  onRetry: () => void;
  loggedUserProfilePicture: string;
  postDescription: string;
  postUsername: string;
  postUserProfilePicture: string;
  state: States;
}

const PostComments = ({
  comment,
  comments,
  onAddComment,
  onChangeComment,
  onRetry,
  loggedUserProfilePicture,
  postDescription,
  postUsername,
  postUserProfilePicture,
  state,
}: HomeProps) => {
  const content = (
    <>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <PostCommentItem
            comment={postDescription}
            isDescription
            username={postUsername}
            userPicture={postUserProfilePicture}
          />
        }
        renderItem={({ item }: { item: Comment }) => (
          <PostCommentItem
            comment={item.comment}
            username={item.user.username}
            userPicture={item.user.profile.profile_picture}
          />
        )}
      />
      <AddCommentContainer>
        <UserPicture imageSource={loggedUserProfilePicture} size={30} />
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
