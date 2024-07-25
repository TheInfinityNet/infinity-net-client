interface User {
  id: string;
  username: string;
  name: string;
  avatarUrl: string;
  bio: string;
  createdAt: Date;
}

interface Post {
  id: string;
  userId: string;
  content: string;
  createdAt: Date;
}

interface Follow {
  followerId: string;
  followingId: string;
  createdAt: Date;
}

interface Like {
  id: string;
  userId: string;
  postId: string;
  createdAt: Date;
}

interface Comment {
  id: string;
  userId: string;
  postId: string;
  content: string;
  createdAt: Date;
}

interface TrendingTopic {
  id: string;
  topic: string;
  likesCount: number;
}
