import React from 'react';
import { TextType } from '~/components/Text';
import Bio from './components/Bio';
import Info from './components/Info';
import { Container, Header, Posts, Username } from './styles';
import { MaterialIcons } from '@expo/vector-icons';
import {
  Dimensions,
  Image,
  RefreshControl,
  ScrollView,
  View,
} from 'react-native';
import { States } from '~/models/states';
import Loading from '~/components/Loading';
import Error from '~/components/Error';
import { PostResponse } from '~/models/post';
import { api } from '~/services/api';

interface ProfilePostOption {
  icon: React.ReactNode;
  isSelected: boolean;
}

interface ProfileProps {
  bio?: string;
  followersNumber: number;
  followingNumber: number;
  postsNumber: number;
  profilePicture: string;
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
  postsNumber,
  posts,
  profilePicture,
  onRetry,
  state,
  username,
  userId,
}: ProfileProps) => {
  const { width } = Dimensions.get('window');

  const content = (
    <>
      <Header>
        <Username type={TextType.bold} size={20}>
          {username}
        </Username>
      </Header>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={onRetry} />
        }
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
          onFollow={() => undefined}
          onGoToUpdate={() => undefined}
          userId={userId}
        />
        <Posts>
          {posts.map((post) => (
            <Image
              source={{
                uri: `${api.defaults.baseURL}/images/${post.PostFile[0].filename}`,
              }}
              style={{ width: width / 3, height: width / 3 }}
            />
          ))}
        </Posts>
      </ScrollView>
    </>
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