import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Home from '~/features/App/Home/Container';
import { useAppSelector } from '~/hooks/redux';
import { PostResponse } from '~/models/post';
import { States } from '~/models/states';
import { deleteLike, likePost, storeFeedPosts } from '~/redux/slices/feedSlice';
import { Routes } from '~/routes/appRoutes';
import { AppNavigationRouteParams } from '~/routes/appRoutesParams';
import { api } from '~/services/api';

interface HomeScreenProps {
  navigation: NativeStackNavigationProp<AppNavigationRouteParams>;
}

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [state, setState] = useState(States.loading);

  const posts = useAppSelector((state) => state.feedReducer.posts);

  const dispatch = useDispatch();

  const userId = useAppSelector((state) => state.authReducer.userId);

  const handleOnGetPosts = async () => {
    setState(States.loading);

    try {
      const response = await api.get<PostResponse[]>(`/feed/${userId}`);

      dispatch(storeFeedPosts(response.data));

      setState(States.default);
    } catch (error: any) {
      console.log(error.response);
      setState(States.error);
    }
  };

  const handleOnLikePost = async (postId: string) => {
    try {
      const findPostLike = posts.find((post) =>
        post.PostLike.find((like) => like.userId === userId)
      );

      if (findPostLike) {
        const foundedLike = findPostLike.PostLike.find(
          (like) => like.userId === userId
        );

        await handleOnDeleteLike(findPostLike.id, foundedLike?.id);

        return;
      }

      const { data } = await api.post(`/posts/${postId}/like`, {
        userId,
      });

      dispatch(likePost(data));

      setState(States.default);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnDeleteLike = async (
    postId: string,
    likeId: string | undefined
  ) => {
    try {
      await api.delete(`/posts/likes/${likeId}`);

      dispatch(deleteLike({ postId, likeId }));

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

  useEffect(() => {
    handleOnGetPosts();
  }, []);

  return (
    <Home
      onGoToComments={handleOnGoToComments}
      onGoToLikes={handleOnGoToLikes}
      onLikePost={handleOnLikePost}
      onRetry={handleOnGetPosts}
      posts={posts}
      state={state}
      userId={userId}
    />
  );
};

export default HomeScreen;
