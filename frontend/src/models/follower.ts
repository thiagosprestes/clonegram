import { PostUser } from './post';

export interface UserFollower {
  followerUser: PostUser;
  id: string;
  userFollowId: string;
  userId: string;
}
