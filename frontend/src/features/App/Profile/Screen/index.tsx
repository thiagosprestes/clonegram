import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import { useAppSelector } from '~/hooks/redux';
import { PostResponse } from '~/models/post';
import { States } from '~/models/states';
import { Routes } from '~/routes/appRoutes';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import Profile from '../Container';
import { AntDesign } from '@expo/vector-icons';
import { removeAuthData } from '~/redux/slices/authSlice';
import { useDispatch } from 'react-redux';

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

  const dispatch = useDispatch();

  const userId = route.params ? route.params.userId : authenticatedUser.userId;

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
      await api.post(`/users/${userId}`, {
        userId: authenticatedUser.userId,
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

  const handleOnGoToFollowers = () => {
    navigation.navigate(Routes.Followers, {
      userId,
    });
  };

  const handleOnGoToFollowing = () => {
    navigation.navigate(Routes.Following, {
      userId,
    });
  };

  useFocusEffect(
    useCallback(() => {
      handleOnGetUserProfile();
      userId !== authenticatedUser.userId && verifyIfUserFollow();
    }, [])
  );

  useEffect(() => {
    navigation.setOptions({
      title: username,
      headerRight: () => (
        <>
          {userId === authenticatedUser.userId && (
            <AntDesign
              name='close'
              size={24}
              color='black'
              onPress={() => dispatch(removeAuthData())}
              style={{ marginRight: 10 }}
            />
          )}
        </>
      ),
    });
  }, [username]);

  return (
    <Profile
      bio={profile.bio}
      followersNumber={profile.followers}
      followingNumber={profile.following}
      isFollowedByUser={isFollowedByUser}
      onFollow={handleOnFollow}
      onGoToFollowers={handleOnGoToFollowers}
      onGoToFollowing={handleOnGoToFollowing}
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
