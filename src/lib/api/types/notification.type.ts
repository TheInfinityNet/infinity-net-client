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

type LikeNotification = BaseNotification & {
  type: NotificationType.Like;
  postId: string;
};

type CommentNotification = BaseNotification & {
  type: NotificationType.Comment;
  postId: string;
  commentId: string;
};

type ReplyNotification = BaseNotification & {
  type: NotificationType.Reply;
  postId: string;
  commentId: string;
  replyId: string;
};

type FollowNotification = BaseNotification & {
  type: NotificationType.Follow;
  followerId: string;
};

type MessageNotification = BaseNotification & {
  type: NotificationType.Message;
  messageId: string;
  contentPreview: string;
};

type TagNotification = BaseNotification & {
  type: NotificationType.Tag;
  postId: string;
  tagId: string;
};

type MentionNotification = BaseNotification & {
  type: NotificationType.Mention;
  postId: string;
  mentionId: string;
};

type FriendRequestNotification = BaseNotification & {
  type: NotificationType.FriendRequest;
  requestId: string;
};

type EventInvitationNotification = BaseNotification & {
  type: NotificationType.EventInvitation;
  eventId: string;
};

type GroupInvitationNotification = BaseNotification & {
  type: NotificationType.GroupInvitation;
  groupId: string;
};

type ShareNotification = BaseNotification & {
  type: NotificationType.Share;
  postId: string;
  sharedById: string;
};

