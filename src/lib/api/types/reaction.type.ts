import { User } from "./user.type";

export enum ReactionType {
  Like = "like",
  Love = "love",
  Haha = "haha",
  Sad = "sad",
  Angry = "angry",
}

export type Reaction = {
  id: string;
  userId: string;
  user?: User;
  postId: string;
  type: ReactionType;
  createdAt: string;
  updatedAt: string;
};

export type PostReaction = {
  id: string;
  userId: string;
  user?: User;
  postId: string;
  type: ReactionType;
  createdAt: string;
  updatedAt: string;
};

export type CommentReaction = {
  id: string;
  userId: string;
  user?: User;
  commentId: string;
  type: ReactionType;
  createdAt: string;
  updatedAt: string;
};

export type MessageReaction = {
  id: string;
  userId: string;
  user?: User;
  messageId: string;
  type: ReactionType;
  createdAt: string;
  updatedAt: string;
};
