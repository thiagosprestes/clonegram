import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';
import { States } from '~/models/states';
import { Routes } from '~/routes/appRoutes';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import PostLikes from '../Container';

interface PostLikesScreenProps {
  route: RouteProp<AppNavigationRouteParams, Routes.PostLikes>;
}

const PostLikesScreen = ({ route }: PostLikesScreenProps) => {
  const [state, setState] = useState(States.loading);
  const [likes, setLikes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearchTerm = useDebounce({ delay: 1000, value: searchTerm });

  const { postId } = route.params;

  const handleOnGetLikes = async () => {
    setState(States.loading);

    try {
      const { data } = await api.get(
        `/posts/${postId}/likes?username=${searchTerm}`
      );

      setLikes(data);

      setState(States.default);
    } catch (error: any) {
      console.log(error.response);
      setState(States.error);
    }
  };

  const handleOnChangeSearchInput = (value: string) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    handleOnGetLikes();
  }, [debouncedSearchTerm]);

  return (
    <PostLikes
      likes={likes}
      onChangeSearchInput={handleOnChangeSearchInput}
      onRetry={handleOnGetLikes}
      searchTerm={searchTerm}
      state={state}
    />
  );
};

export default PostLikesScreen;
