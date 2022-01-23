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
  [Routes.Profile]: {
    screen: Routes.Profile;
    userId: string;
  };
  [Routes.Post]: {
    postId: string;
  };
  [Routes.Followers]: {
    userId: string;
  };
  [Routes.Following]: {
    userId: string;
  };
  [Routes.SignUp]: undefined;
  [Routes.EditProfile]: { userId: string };
};
