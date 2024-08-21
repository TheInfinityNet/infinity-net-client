import { Conversation } from "./conversation.type";
import { User } from "./user.type";

export type Participant = {
  id: string;
  userId: string;
  user?: User;
  conversationId: string;
  conversation?: Conversation;
  createdAt: string;
  updatedAt: string;
};
