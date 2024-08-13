import { User } from "./user.type";

export enum ReactionType {
  Like = "like",
  Love = "love",
  Haha = "haha",
  Sad = "sad",
  FoldedHands = "folded_hands",
  Dislike = "dislike",
  Angry = "angry",
}

export const ReactionTypeToUnifiedMap: {
  [key in ReactionType]: string;
} = {
  like: "1f44d",
  love: "2764-fe0f",
  haha: "1f603",
  sad: "1f622",
  folded_hands: "1f64f",
  dislike: "1f44e",
  angry: "1f621",
};

export const UnifiedToReactionTypeMap: { [key: string]: ReactionType } =
  Object.entries(ReactionTypeToUnifiedMap).reduce(
    (acc, [key, value]) => {
      acc[value] = key as ReactionType;
      return acc;
    },
    {} as { [key: string]: ReactionType },
  );

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
