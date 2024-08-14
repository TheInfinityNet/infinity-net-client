import { Conversation } from "./conversation.type";
import { User } from "./user.type";

export type Message = {
  id: string;
  userId: string;
  conversationId: string;
  conversation?: Conversation;
  content: string;
  seenBy?: User[];
  createdAt: string;
  updatedAt: string;
};
