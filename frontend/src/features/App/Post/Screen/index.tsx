import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Home from '~/features/App/Home/Container';
import { useAppSelector } from '~/hooks/redux';
import { PostLike, PostResponse, PostUser } from '~/models/post';
import { States } from '~/models/states';
import {
  deleteLike,
  deletePost,
  likePost,
  storeFeedPosts,
} from '~/redux/slices/feedSlice';
import { Routes } from '~/routes/appRoutes';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';
import Post from '../Container';

interface PostScreenProps {
  navigation: NativeStackNavigationProp<AppNavigationRouteParams>;
  route: RouteProp<AppNavigationRouteParams, Routes.Post>;
}

const PostScreen = ({ navigation, route }: PostScreenProps) => {
  const [state, setState] = useState(States.loading);
  const [post, setPost] = useState<PostResponse>({} as PostResponse);
  const [postUser, setPostUser] = useState<PostUser>({} as PostUser);
  const [postUserProfile, setPostUserProfile] = useState<UserProfile>(
    {} as UserProfile
  );
  const [postLikes, setPostLikes] = useState<PostLike[]>({} as PostLike[]);

  const userId = useAppSelector((state) => state.authReducer.userId);

  const { postId } = route.params;

  const dispatch = useDispatch();

  const handleOnGetPost = async () => {
    setState(States.loading);

    try {
      const { data } = await api.get<PostResponse>(`/post/${postId}`);

      setPost(data);
      setPostUser(data.user);
      setPostUserProfile(data.user.profile);
      setPostLikes(data.PostLike);

      setState(States.default);
    } catch (error: any) {
      console.log(error.response);
      setState(States.error);
    }
  };

  const handleOnLikePost = async (postId: string) => {
    try {
      const findPostLike = postLikes.find((like) => like.userId === userId);

      if (findPostLike) {
        await handleOnDeleteLike(findPostLike.id);

        return;
      }

      const { data } = await api.post(`/posts/${postId}/like`, {
        userId,
      });

      dispatch(likePost(data));

      setPostLikes([...postLikes, data]);

      setState(States.default);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnDeleteLike = async (likeId: string | undefined) => {
    try {
      await api.delete(`/posts/likes/${likeId}`);

      dispatch(deleteLike({ postId, likeId }));

      setPostLikes(postLikes.filter((like) => like.id !== likeId));

      setState(States.default);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnGoToLikes = (postId: string) => {
    navigation.navigate(Routes.PostLikes, {
      postId,
    });
  };

  const handleOnGoToComments = (postId: string) => {
    navigation.navigate(Routes.PostComments, {
      postId,
    });
  };

  const handleOnDeletePost = async (postId: string) => {
    try {
      setState(States.loading);

      await api.delete(`/posts/${postId}`);

      dispatch(deletePost(postId));
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleOnGetPost();
  }, []);

  return (
    <Post
      commentsNumber={post.PostComment?.length}
      files={post.PostFile}
      likes={postLikes}
      location={post.location}
      onDeletePost={handleOnDeletePost}
      onGoToComments={handleOnGoToComments}
      onGoToLikes={handleOnGoToLikes}
      onLikePost={handleOnLikePost}
      onRefresh={handleOnGetPost}
      onRetry={handleOnGetPost}
      postAuthorId={postUser.id}
      postId={post.id}
      state={state}
      userId={userId}
      username={postUser.username}
      userProfilePicture={postUserProfile.profile_picture}
    />
  );
};

export default PostScreen;
