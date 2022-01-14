import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import PostContainer from '~/components/Post';
import { PostFile, PostLike } from '~/models/post';
import { States } from '~/models/states';
import { Container } from './styles';

interface PostProps {
  commentsNumber: number;
  description?: string;
  files: PostFile[];
  likes: PostLike[];
  location?: string;
  onDeletePost: (postId: string) => void;
  onGoToComments: (postId: string) => void;
  onGoToLikes: (postId: string) => void;
  onLikePost: (postId: string) => void;
  onRetry: () => void;
  onRefresh: () => void;
  postAuthorId: string;
  postId: string;
  state: States;
  userId: string;
  username: string;
  userProfilePicture: string;
}

const Post = ({
  commentsNumber,
  description,
  files,
  likes,
  location,
  onDeletePost,
  onGoToComments,
  onGoToLikes,
  onLikePost,
  onRetry,
  postAuthorId,
  postId,
  state,
  userId,
  username,
  userProfilePicture,
}: PostProps) => {
  const content = (
    <PostContainer
      commentsNumber={commentsNumber}
      description={description}
      files={files}
      likes={likes}
      location={location}
      onDeletePost={onDeletePost}
      onGoToComments={onGoToComments}
      onGoToLikes={onGoToLikes}
      onLikePost={onLikePost}
      postId={postId}
      postAuthorId={postAuthorId}
      userId={userId}
      username={username}
      userProfilePicture={userProfilePicture}
    />
  );

  const loading = <Loading />;

  const error = <Error onRetry={onRetry} />;

  return (
    <Container>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRetry} />
        }
      >
        {
          {
            [States.default]: content,
            [States.loading]: loading,
            [States.error]: error,
          }[state]
        }
      </ScrollView>
    </Container>
  );
};

export default Post;
