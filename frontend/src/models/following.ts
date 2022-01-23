import { PostUser } from './post';

export interface UserFollowing {
  followerUser: PostUser;
  id: string;
  userFollowId: string;
  userId: string;
}
