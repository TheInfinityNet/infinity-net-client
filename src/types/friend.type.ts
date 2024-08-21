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

export enum FriendshipStatus {
  Self = "SELF",
  SentRequest = "SENT_REQUEST",
  ReceivedRequest = "RECEIVED_REQUEST",
  Accepted = "ACCEPTED",
  NotFriends = "NOT_FRIENDS",
}
