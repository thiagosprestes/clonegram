import { PostUser } from './post';

export interface UserFollower {
  followingUser: PostUser;
  id: string;
  userFollowId: string;
  userId: string;
}
