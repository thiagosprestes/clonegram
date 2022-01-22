import { PostUser } from './post';

export interface UserFollowing {
  followingUser: PostUser;
  id: string;
  userFollowId: string;
  userId: string;
}
