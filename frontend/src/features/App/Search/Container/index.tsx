import React from 'react';
import { FlatList } from 'react-native';
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
  onRetry: () => void;
  searchTerm: string;
  state: States;
}

const Search = ({
  users,
  onChangeSearchInput,
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
        <UsersListItem
          username={item.username}
          userPicture={item.profile.profile_picture}
        />
      )}
    />
  );

  const loading = <Loading />;

  const error = <Error onRetry={onRetry} />;

  return (
    <Container>
      <Input
        placeholder='Pesquisar'
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
