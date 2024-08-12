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
