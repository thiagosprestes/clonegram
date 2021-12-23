export interface PostResponse {
  id: string;
  location: string;
  PostFile: PostFile[];
  description: string;
  user: PostUser;
  PostLike: PostLike[];
  PostComment: [];
}

export interface PostUser {
  id: string;
  email: string;
  profileId: string;
  username: string;
  profile: UserProfile;
}

export interface PostFile {
  id: string;
  filename: string;
}

export interface UserProfile {
  profile_picture: string;
}

export interface PostLike {
  id: string;
  postId: string;
  userId: string;
  user: PostUser;
}
