import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import { States } from '~/models/states';
import UsersListItem from '~/components/UsersListItem';
import { Container, Input } from './styles';
import { colors } from '~/styleguide';
import { UserFollowing } from '~/models/following';

interface FollowingProps {
  following: UserFollowing[];
  onChangeFollowingInput: (following: string) => void;
  onGoToProfile: (userId: string) => void;
  onRetry: () => void;
  username: string;
  state: States;
}

const Following = ({
  following,
  onChangeFollowingInput,
  onGoToProfile,
  onRetry,
  username,
  state,
}: FollowingProps) => {
  const content = (
    <FlatList
      data={following}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }: { item: UserFollowing }) => (
        <TouchableOpacity onPress={() => onGoToProfile(item.followingUser.id)}>
          <UsersListItem
            username={item.followingUser.username}
            userPicture={item.followingUser.profile.profile_picture}
          />
        </TouchableOpacity>
      )}
    />
  );

  const loading = <Loading />;

  const error = <Error onRetry={onRetry} />;

  return (
    <Container>
      <Input
        placeholder='Digite um nome de usuário'
        placeholderTextColor={colors.lightGreyText}
        onChangeText={(text) => onChangeFollowingInput(text)}
        value={username}
      />
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

export default Following;
