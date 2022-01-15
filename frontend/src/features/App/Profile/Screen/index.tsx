import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { useAppSelector } from '~/hooks/redux';
import { PostResponse } from '~/models/post';
import { States } from '~/models/states';
import { User } from '~/models/user';
import { Routes } from '~/routes/appRoutes';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import Profile from '../Container';

interface ProfileScreenProps {
  navigation: NativeStackNavigationProp<AppNavigationRouteParams>;
  route: RouteProp<AppNavigationRouteParams, Routes.Profile>;
}

const ProfileScreen = ({ navigation, route }: ProfileScreenProps) => {
  const [state, setState] = useState(States.loading);
  const [profile, setProfile] = useState<UserProfile>({} as UserProfile);
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [isFollowedByUser, setIsFollowedByUser] = useState(false);

  const authenticatedUser = useAppSelector((state) => state.authReducer);

  const { userId } = route.params ?? authenticatedUser;

  const handleOnGetUserProfile = async () => {
    setState(States.loading);

    try {
      const { data } = await api.get(`/user/${userId}`);

      setPosts(data.Post);
      setProfile(data.profile);
      setUsername(data.username);

      setState(States.default);
    } catch (error: any) {
      console.log(error.response);
      setState(States.error);
    }
  };

  const handleOnGoToPost = (postId: string) => {
    navigation.navigate(Routes.Post, {
      postId,
    });
  };

  const verifyIfUserFollow = async () => {
    const { data } = await api.get(
      `/users/follows/${route.params.userId}?authUserId=${authenticatedUser.userId}`
    );

    setIsFollowedByUser(data.isUserFollow);
  };

  const handleOnFollow = async (userId: string) => {
    try {
      await api.post(`/users/${authenticatedUser.userId}`, {
        userId,
      });

      setIsFollowedByUser(true);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Erro ao seguir usuário', 3000);
    }
  };

  const handleOnUnfollow = async (userId: string) => {
    try {
      await api.delete(`/users/${authenticatedUser.userId}/follows`, {
        params: {
          userId,
        },
      });

      setIsFollowedByUser(false);
    } catch (error) {
      console.log(error);
      ToastAndroid.show('Erro ao deixar de seguir usuário', 3000);
    }
  };

  useFocusEffect(
    useCallback(() => {
      handleOnGetUserProfile();
      verifyIfUserFollow();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      title: username,
    });
  }, [username]);

  return (
    <Profile
      bio={profile.bio}
      followersNumber={profile.followers}
      followingNumber={profile.following}
      isFollowedByUser={isFollowedByUser}
      onFollow={handleOnFollow}
      onGoToPost={handleOnGoToPost}
      onUnfollow={handleOnUnfollow}
      onRetry={handleOnGetUserProfile}
      postsNumber={posts?.length ?? 0}
      posts={posts}
      profilePicture={profile.profile_picture}
      state={state}
      username={username}
      userId={userId}
    />
  );
};

export default ProfileScreen;
