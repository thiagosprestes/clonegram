import { Routes } from '~/routes/appRoutes';

export type AppNavigationRouteParams = {
  [Routes.Home]: undefined;
  [Routes.Search]: undefined;
  [Routes.PostLikes]: {
    postId: string;
  };
  [Routes.PostComments]: {
    postId: string;
  };
};
