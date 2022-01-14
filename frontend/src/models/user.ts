import { PostResponse } from './post';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  profileId: string;
  profile: UserProfile;
  Post: PostResponse[];
}
