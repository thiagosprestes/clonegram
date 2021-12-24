import { PostUser } from './post';

export interface Comment {
  id: string;
  comment: string;
  postId: string;
  user: PostUser;
  userId: string;
}
