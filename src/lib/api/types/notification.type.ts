export enum NotificationType {
  Like = "LIKE",
  Comment = "COMMENT",
  Reply = "REPLY",
  Follow = "FOLLOW",
  Message = "MESSAGE",
  Tag = "TAG",
  Mention = "MENTION",
  FriendRequest = "FRIEND_REQUEST",
  EventInvitation = "EVENT_INVITATION",
  GroupInvitation = "GROUP_INVITATION",
  Share = "SHARE",
  Reaction = "REACTION",
  Achievement = "ACHIEVEMENT",
  Story = "STORY",
}

type BaseNotification = {
  id: string;
  userId: string;
  isRead: boolean;
  createdAt: Date;
};

