import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import { States } from '~/models/states';
import UsersListItem from '~/components/UsersListItem';
import { Container } from './styles';
import { colors } from '~/styleguide';
import { UserFollower } from '~/models/follower';
import Input from '~/components/Input';

interface FollowersProps {
  followers: UserFollower[];
  onChangeFollowersInput: (Followers: string) => void;
  onGoToProfile: (userId: string) => void;
  onRetry: () => void;
  username: string;
  state: States;
}

const Followers = ({
  followers,
  onChangeFollowersInput,
  onGoToProfile,
  onRetry,
  username,
  state,
}: FollowersProps) => {
  const content = (
    <FlatList
      data={followers}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }: { item: UserFollower }) => (
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
        // placeholderTextColor={colors.lightGreyText}
        onChangeFieldValue={(text: string) => onChangeFollowersInput(text)}
        fieldValue={username}
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

export default Followers;
