import React from 'react';
import { FlatList, RefreshControl, Text } from 'react-native';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import Post from '~/components/Post';
import { PostResponse } from '~/models/post';
import { States } from '~/models/states';
import Header from './components/Header';
import { Container } from './styles';

interface HomeProps {
  onGoToComments: (postId: string) => void;
  onGoToLikes: (postId: string) => void;
  onLikePost: (postId: string) => void;
  onRetry: () => void;
  onRefresh: () => void;
  posts: PostResponse[];
  state: States;
  userId: string;
}

const Home = ({
  onGoToComments,
  onGoToLikes,
  onLikePost,
  onRetry,
  onRefresh,
  posts,
  state,
  userId,
}: HomeProps) => {
  const content = (
    <>
      {posts && (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={false} onRefresh={onRefresh} />
          }
          data={posts}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Post
              comments={item.PostComment}
              description={item.description}
              files={item.PostFile}
              likes={item.PostLike}
              location=''
              onGoToComments={onGoToComments}
              onGoToLikes={onGoToLikes}
              onLikePost={onLikePost}
              postId={item.id}
              userId={userId}
              username={item.user.username}
              userProfilePicture={item.user.profile.profile_picture}
            />
          )}
        />
      )}
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
