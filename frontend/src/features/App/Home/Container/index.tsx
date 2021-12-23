import React from 'react';
import { FlatList, Text } from 'react-native';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import Post from '~/components/Post';
import { PostResponse } from '~/models/post';
import { States } from '~/models/states';
import Header from './components/Header';
import { Container } from './styles';

interface HomeProps {
  onGoToLikes: (postId: string) => void;
  onLikePost: (postId: string) => void;
  onRetry: () => void;
  posts: PostResponse[];
  state: States;
  userId: string;
}

const Home = ({
  onGoToLikes,
  onLikePost,
  onRetry,
  posts,
  state,
  userId,
}: HomeProps) => {
  const content = (
    <>
      {posts && (
        <FlatList
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
