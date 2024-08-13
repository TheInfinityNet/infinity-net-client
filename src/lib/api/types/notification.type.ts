import { User } from "./user.type";

export enum NotificationType {
  Comment = "COMMENT",
  Reply = "REPLY",
  Follow = "FOLLOW",
  Message = "MESSAGE",
  Tag = "TAG",
  Mention = "MENTION",
  FriendRequest = "FRIEND_REQUEST",
  GroupInvitation = "GROUP_INVITATION",
  Share = "SHARE",
  Reaction = "REACTION",
  Story = "STORY",
}

export type BaseNotification = {
  id: string;
  userId: string;
  user?: User;
  isRead: boolean;
  createdAt: string;
};

export type CommentNotificationDetails = {
  type: NotificationType.Comment;
  postId: string;
  commentId: string;
};

export type ReplyNotificationDetails = {
  type: NotificationType.Reply;
  postId: string;
  commentId: string;
  replyId: string;
};

export type FollowNotificationDetails = {
  type: NotificationType.Follow;
  followerId: string;
};

export type MessageNotificationDetails = {
  type: NotificationType.Message;
  messageId: string;
  contentPreview: string;
};

export type TagNotificationDetails = {
  type: NotificationType.Tag;
  postId: string;
  tagId: string;
};

export type MentionNotificationDetails = {
  type: NotificationType.Mention;
  postId: string;
  mentionId: string;
};

export type FriendRequestNotificationDetails = {
  type: NotificationType.FriendRequest;
  requestId: string;
};

export type GroupInvitationNotificationDetails = {
  type: NotificationType.GroupInvitation;
  groupId: string;
};

export type ShareNotificationDetails = {
  type: NotificationType.Share;
  postId: string;
  sharedById: string;
};

export type ReactionNotificationDetails = {
  type: NotificationType.Reaction;
  postId: string;
  reactionType: string;
};

export type StoryNotificationDetails = {
  type: NotificationType.Story;
  storyId: string;
};

export type CommentNotification = BaseNotification & CommentNotificationDetails;
export type ReplyNotification = BaseNotification & ReplyNotificationDetails;
export type FollowNotification = BaseNotification & FollowNotificationDetails;
export type MessageNotification = BaseNotification & MessageNotificationDetails;
export type TagNotification = BaseNotification & TagNotificationDetails;
export type MentionNotification = BaseNotification & MentionNotificationDetails;
export type FriendRequestNotification = BaseNotification &
  FriendRequestNotificationDetails;
export type GroupInvitationNotification = BaseNotification &
  GroupInvitationNotificationDetails;
export type ShareNotification = BaseNotification & ShareNotificationDetails;
export type ReactionNotification = BaseNotification &
  ReactionNotificationDetails;
export type StoryNotification = BaseNotification & StoryNotificationDetails;

export type Notification =
  | CommentNotification
  | ReplyNotification
  | FollowNotification
  | MessageNotification
  | TagNotification
  | MentionNotification
  | FriendRequestNotification
  | GroupInvitationNotification
  | ShareNotification
  | ReactionNotification
  | StoryNotification;
