import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '~/hooks/redux';
import { States } from '~/models/states';
import {
  addComment,
  storeCommentsList,
} from '~/redux/slices/postCommentsSlice';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import Profile from '../Container';
import PostComments from '../Container';

interface ProfileScreenProps {
  route: RouteProp<AppNavigationRouteParams>;
}

const ProfileScreen = ({ route }: ProfileScreenProps) => {
  const [state, setState] = useState(States.loading);
  const [comment, setComment] = useState('');

  const postId = route.params?.postId;

  const { userId, userProfilePicture } = useAppSelector(
    (state) => state.authReducer
  );

  const comments = useAppSelector(
    (state) => state.postCommentsReducer.comments
  );

  const post = useAppSelector((state) =>
    state.feedReducer.posts.find((post) => post.id === postId)
  );

  const dispatch = useDispatch();

  const handleOnGetComments = async () => {
    setState(States.loading);

    try {
      const { data } = await api.get(`/posts/${postId}/comments`);

      dispatch(storeCommentsList(data));

      setState(States.default);
    } catch (error: any) {
      console.log(error.response);
      setState(States.error);
    }
  };

  const handleOnChangeComment = (value: string) => {
    setComment(value);
  };

  const handleOnAddComment = async () => {
    try {
      const { data } = await api.post(`/posts/${postId}`, {
        userId,
        comment,
      });

      dispatch(addComment(data));

      setComment('');

      setState(States.default);
    } catch (error: any) {
      console.log(error.response);
      setState(States.error);
    }
  };

  useEffect(() => {
    handleOnGetComments();
  }, []);

  return <Profile />;
};

export default ProfileScreen;
