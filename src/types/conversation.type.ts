import { Message } from "./message.type";
import { Participant } from "./participant.type";

export type Conversation = {
  id: string;
  participants: Participant[];
  lastMessage?: Message;
  unreadCount: number;
};
