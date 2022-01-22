import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';
import { UserFollowing } from '~/models/following';
import { States } from '~/models/states';
import { Routes } from '~/routes/appRoutes';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import Following from '../Container';

interface FollowingScreenProps {
  navigation: NativeStackNavigationProp<AppNavigationRouteParams>;
  route: RouteProp<AppNavigationRouteParams, Routes.Following>;
}

const FollowingScreen = ({ navigation, route }: FollowingScreenProps) => {
  const [state, setState] = useState(States.default);
  const [following, setFollowing] = useState<UserFollowing[]>([]);
  const [username, setUsername] = useState('');

  const debouncedUsername = useDebounce({
    delay: 1000,
    value: username,
  });

  const { userId } = route.params;

  const handleOnGetFollowing = async () => {
    setState(States.loading);

    try {
      const { data } = await api.get(
        `/users/${userId}/follows?username=${username}&page=${1}`
      );

      setFollowing(data);

      setState(States.default);
    } catch (error: any) {
      console.log(error.response);
      setState(States.error);
    }
  };

  const handleOnChangeFollowingInput = (value: string) => {
    setUsername(value);
  };

  const handleOnGoToProfile = (userId: string) => {
    navigation.replace(Routes.Profile, {
      screen: Routes.Profile,
      userId,
    });
  };

  useEffect(() => {
    handleOnGetFollowing();
  }, [debouncedUsername]);

  return (
    <Following
      following={following}
      onChangeFollowingInput={handleOnChangeFollowingInput}
      onGoToProfile={handleOnGoToProfile}
      onRetry={handleOnGetFollowing}
      username={username}
      state={state}
    />
  );
};

export default FollowingScreen;
