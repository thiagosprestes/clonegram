import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import useDebounce from '~/hooks/useDebounce';
import { UserFollower } from '~/models/follower';
import { States } from '~/models/states';
import { User } from '~/models/user';
import { Routes } from '~/routes/appRoutes';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import Followers from '../Container';

interface FollowersScreenProps {
  navigation: NativeStackNavigationProp<AppNavigationRouteParams>;
  route: RouteProp<AppNavigationRouteParams, Routes.Followers>;
}

const FollowersScreen = ({ navigation, route }: FollowersScreenProps) => {
  const [state, setState] = useState(States.default);
  const [followers, setFollowers] = useState<UserFollower[]>([]);
  const [username, setUsername] = useState('');

  const debouncedUsername = useDebounce({
    delay: 1000,
    value: username,
  });

  const { userId } = route.params;

  const handleOnGetFollowers = async () => {
    setState(States.loading);

    try {
      const { data } = await api.get(
        `/users/${userId}/followers?username=${username}&page=${1}`
      );

      setFollowers(data);

      setState(States.default);
    } catch (error: any) {
      console.log(error.response);
      setState(States.error);
    }
  };

  const handleOnChangeFollowersInput = (value: string) => {
    setUsername(value);
  };

  const handleOnGoToProfile = (userId: string) => {
    navigation.replace(Routes.Profile, {
      screen: Routes.Profile,
      userId,
    });
  };

  useEffect(() => {
    handleOnGetFollowers();
  }, [debouncedUsername]);

  return (
    <Followers
      followers={followers}
      onChangeFollowersInput={handleOnChangeFollowersInput}
      onGoToProfile={handleOnGoToProfile}
      onRetry={handleOnGetFollowers}
      username={username}
      state={state}
    />
  );
};

export default FollowersScreen;
