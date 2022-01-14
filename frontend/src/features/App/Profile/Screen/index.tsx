import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
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
  const [user, setUser] = useState<User>();
  const [profile, setProfile] = useState<UserProfile>({} as UserProfile);
  const [username, setUsername] = useState('');
  const [posts, setPosts] = useState<PostResponse[]>([]);

  const authenticatedUserId = useAppSelector((state) => state.authReducer);

  const { userId } = route.params ?? authenticatedUserId;

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

  useFocusEffect(
    useCallback(() => {
      handleOnGetUserProfile();
    }, [])
  );

  return (
    <Profile
      bio={profile.bio}
      followersNumber={profile.followers}
      followingNumber={profile.following}
      onGoToPost={handleOnGoToPost}
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
