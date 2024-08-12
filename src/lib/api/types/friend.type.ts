import { User } from "./user.type";

export type FriendRequest = {
  id: string;
  requesterId: string;
  requesteeId: string;
  requester?: User;
  requestee?: User;
  createdAt: Date;
};

export type Friend = {
  id: string;
  initiatorId: string;
  recipientId: string;
  initiator?: User;
  recipient?: User;
  createdAt: Date;
};
