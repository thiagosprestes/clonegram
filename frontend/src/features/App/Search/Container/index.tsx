import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import { States } from '~/models/states';
import UsersListItem from '~/components/UsersListItem';
import { Container, Input } from './styles';
import { User } from '~/models/user';
import { colors } from '~/styleguide';

interface SearchProps {
  users: User[];
  onChangeSearchInput: (search: string) => void;
  onGoToProfile: (userId: string) => void;
  onRetry: () => void;
  searchTerm: string;
  state: States;
}

const Search = ({
  users,
  onChangeSearchInput,
  onGoToProfile,
  onRetry,
  searchTerm,
  state,
}: SearchProps) => {
  const content = (
    <FlatList
      data={users}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }: { item: User }) => (
        <TouchableOpacity onPress={() => onGoToProfile(item.id)}>
          <UsersListItem
            username={item.username}
            userPicture={item.profile.profile_picture}
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
        onChangeText={(text) => onChangeSearchInput(text)}
        value={searchTerm}
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

export default Search;
