import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import EmptyContent from '~/components/EmptyContent';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import Post from '~/components/Post';
import { PostResponse } from '~/models/post';
import { States } from '~/models/states';
import Header from './components/Header';
import { Container } from './styles';

interface HomeProps {
  onDeletePost: (postId: string) => void;
  onGoToComments: (postId: string) => void;
  onGoToLikes: (postId: string) => void;
  onGoToUserProfile: (userId: string) => void;
  onLikePost: (postId: string) => void;
  onRetry: () => void;
  onRefresh: () => void;
  posts: PostResponse[];
  state: States;
  userId: string;
}

const Home = ({
  onDeletePost,
  onGoToComments,
  onGoToLikes,
  onGoToUserProfile,
  onLikePost,
  onRetry,
  onRefresh,
  posts,
  state,
  userId,
}: HomeProps) => {
  const content = (
    <>
      {posts &&
        (posts.length > 0 ? (
          <FlatList
            refreshControl={
              <RefreshControl refreshing={false} onRefresh={onRefresh} />
            }
            data={posts}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <Post
                commentsNumber={item.PostComment.length}
                description={item.description}
                files={item.PostFile}
                likes={item.PostLike}
                location=''
                onDeletePost={onDeletePost}
                onGoToComments={onGoToComments}
                onGoToLikes={onGoToLikes}
                onGoToUserProfile={onGoToUserProfile}
                onLikePost={onLikePost}
                postAuthorId={item.user.id}
                postId={item.id}
                userId={userId}
                username={item.user.username}
                userProfilePicture={item.user.profile.profile_picture}
              />
            )}
          />
        ) : (
          <EmptyContent text='Nenhuma postagem foi encontrada!' />
        ))}
    </>
  );

  const loading = <Loading />;

  const error = <Error onRetry={onRetry} />;

  return (
    <Container>
      <Header />
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

export default Home;
