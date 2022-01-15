import React from 'react';
import Bio from './components/Bio';
import Info from './components/Info';
import { Container, Posts } from './styles';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { States } from '~/models/states';
import Loading from '~/components/Loading';
import Error from '~/components/Error';
import { PostResponse } from '~/models/post';
import { api } from '~/services/api';
import EmptyContent from '~/components/EmptyContent';
import ImageComponent from '~/components/Image';

interface ProfileProps {
  bio?: string;
  followersNumber: number;
  followingNumber: number;
  isFollowedByUser: boolean;
  postsNumber: number;
  profilePicture: string;
  onFollow: (userId: string) => void;
  onGoToPost: (postId: string) => void;
  onUnfollow: (userId: string) => void;
  posts: PostResponse[];
  onRetry: () => void;
  state: States;
  username: string;
  userId: string;
}

const Profile = ({
  bio,
  followersNumber,
  followingNumber,
  isFollowedByUser,
  postsNumber,
  posts,
  profilePicture,
  onFollow,
  onUnfollow,
  onGoToPost,
  onRetry,
  state,
  username,
  userId,
}: ProfileProps) => {
  const { width } = Dimensions.get('window');

  const content = (
    <ScrollView
      refreshControl={<RefreshControl refreshing={false} onRefresh={onRetry} />}
    >
      <Info
        followers={followersNumber}
        following={followingNumber}
        posts={postsNumber}
        profilePicture={profilePicture}
      />
      <Bio
        bio={bio}
        name={username}
        isFollowedByUser={isFollowedByUser}
        onFollow={onFollow}
        onGoToUpdate={() => undefined}
        onUnfollow={onUnfollow}
        userId={userId}
      />
      <Posts>
        {posts.length > 0 ? (
          posts.map((post) => (
            <TouchableOpacity key={post.id} onPress={() => onGoToPost(post.id)}>
              <ImageComponent
                imageSource={post.PostFile[0].filename}
                size={width / 3}
              />
            </TouchableOpacity>
          ))
        ) : (
          <EmptyContent text='Nenhuma postagem foi encontrada!' />
        )}
      </Posts>
    </ScrollView>
  );

  const loading = <Loading />;

  const error = <Error onRetry={onRetry} />;

  return (
    <Container>
      {
        {
          [States.default]: content,
          [States.error]: error,
          [States.loading]: loading,
        }[state]
      }
    </Container>
  );
};

export default Profile;
