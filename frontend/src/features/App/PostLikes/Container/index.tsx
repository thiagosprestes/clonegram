import React from 'react';
import { FlatList } from 'react-native';
import Error from '~/components/Error';
import Loading from '~/components/Loading';
import UsersListItem from '~/components/UsersListItem';
import { useTheme } from '~/hooks/useTheme';
import { PostLike } from '~/models/post';
import { States } from '~/models/states';
import { Container, Input } from './styles';

interface HomeProps {
  likes: PostLike[];
  onChangeSearchInput: (search: string) => void;
  onRetry: () => void;
  searchTerm: string;
  state: States;
}

const PostLikes = ({
  likes,
  onChangeSearchInput,
  onRetry,
  searchTerm,
  state,
}: HomeProps) => {
  const { theme } = useTheme();

  const content = (
    <FlatList
      data={likes}
      keyExtractor={(item) => item.id}
      showsVerticalScrollIndicator={false}
      renderItem={({ item }: { item: PostLike }) => (
        <UsersListItem
          username={item.user.username}
          userPicture={item.user.profile.profile_picture}
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
        placeholderTextColor={theme.colors.inputText}
        onChangeText={(text) => onChangeSearchInput(text)}
        value={searchTerm}
      />
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

export default PostLikes;
