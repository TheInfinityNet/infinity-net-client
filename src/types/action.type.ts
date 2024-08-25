export enum PostActions {
  React = 'POST_REACT',
  Comment = 'POST_COMMENT',
  Share = 'POST_SHARE',
  Edit = 'POST_EDIT',
  Delete = 'POST_DELETE',
  Report = 'POST_REPORT',
}

export enum UserActions {
  SendFriendRequest = 'USER_SEND_FRIEND_REQUEST',
  AcceptFriendRequest = 'USER_ACCEPT_FRIEND_REQUEST',
  RejectFriendRequest = 'USER_REJECT_FRIEND_REQUEST',
  BlockUser = 'USER_BLOCK',
  UnblockUser = 'USER_UNBLOCK',
  ReportUser = 'USER_REPORT',
  FollowUser = 'USER_FOLLOW',
  UnfollowUser = 'USER_UNFOLLOW',
  SendMessage = 'USER_SEND_MESSAGE',
  ViewProfile = 'USER_VIEW_PROFILE',
  RemoveFriend = 'USER_REMOVE_FRIEND',
}

export enum CommentActions {
  React = 'COMMENT_REACT',
  Reply = 'COMMENT_REPLY',
  Edit = 'COMMENT_EDIT',
  Delete = 'COMMENT_DELETE',
  Report = 'COMMENT_REPORT',
}

export type Action<T extends string, P = undefined> = P extends undefined ? { type: T } : { type: T } & P;
