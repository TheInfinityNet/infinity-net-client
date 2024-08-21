import { Conversation } from "./conversation.type";
import { MessageReaction, ReactionType } from "./reaction.type";
import { User } from "./user.type";

export type Message = {
  id: string;
  userId: string;
  user?: User;
  conversationId: string;
  conversation?: Conversation;
  currentUserReaction?: MessageReaction;
  reactionCounts?: {
    [key in ReactionType]: number;
  };
  content: string;
  seenBy?: User[];
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};
