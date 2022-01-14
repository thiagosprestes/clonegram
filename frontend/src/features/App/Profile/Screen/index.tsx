import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '~/hooks/redux';
import { PostResponse } from '~/models/post';
import { States } from '~/models/states';
import { User } from '~/models/user';
import {
  addComment,
  storeCommentsList,
} from '~/redux/slices/postCommentsSlice';
import { Routes } from '~/routes/appRoutes';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import Profile from '../Container';
import PostComments from '../Container';

interface ProfileScreenProps {
  route: RouteProp<AppNavigationRouteParams, Routes.Profile>;
}

const ProfileScreen = ({ route }: ProfileScreenProps) => {
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

  useEffect(() => {
    handleOnGetUserProfile();
  }, []);

  return (
    <Profile
      bio={profile.bio}
      followersNumber={profile.followers}
      followingNumber={profile.following}
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
