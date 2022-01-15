import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useAppSelector } from '~/hooks/redux';
import { States } from '~/models/states';
import {
  addComment,
  removeComment,
  storeCommentsList,
} from '~/redux/slices/postCommentsSlice';
import { Routes } from '~/routes/appRoutes';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import PostComments from '../Container';

interface PostCommentsScreenProps {
  route: RouteProp<AppNavigationRouteParams, Routes.PostComments>;
}

const PostCommentsScreen = ({ route }: PostCommentsScreenProps) => {
  const [state, setState] = useState(States.loading);
  const [comment, setComment] = useState('');
  const [isShowDeleteCommentModal, setIsShowDeleteCommentModal] =
    useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState('');

  const { postId } = route.params;

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

  const handleOnDeleteComment = async () => {
    try {
      await api.delete(`/posts/comments/${selectedCommentId}`);

      dispatch(removeComment(selectedCommentId));

      setIsShowDeleteCommentModal(false);
    } catch (error: any) {
      console.log(error.response);
      console.log('AQIO');
      setState(States.error);
    }
  };

  const handleOnSelectComment = (
    commentId: string,
    commentAuthorId: string
  ) => {
    if (userId === commentAuthorId || userId === post?.user.id) {
      setIsShowDeleteCommentModal(true);
      setSelectedCommentId(commentId);
    }
  };

  useEffect(() => {
    handleOnGetComments();
  }, []);

  return (
    <PostComments
      comment={comment}
      comments={comments}
      isShowDeleteCommentModal={isShowDeleteCommentModal}
      onAddComment={handleOnAddComment}
      onChangeComment={handleOnChangeComment}
      onCloseDeleteCommentModal={() => setIsShowDeleteCommentModal(false)}
      onDeleteComment={handleOnDeleteComment}
      onRetry={handleOnGetComments}
      onSelectComment={handleOnSelectComment}
      loggedUserProfilePicture={userProfilePicture}
      postDescription={post?.description!}
      postUsername={post?.user.username!}
      postUserProfilePicture={post?.user.profile.profile_picture!}
      selectedCommentId={selectedCommentId}
      state={state}
    />
  );
};

export default PostCommentsScreen;
