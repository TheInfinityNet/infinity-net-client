import { PostActions } from "./action.type";
import { ReactionType } from "./reaction.type";

export enum PostCurrentReactStatus {
  Reacted = 'REACTED',
  NotReacted = 'NOT_REACTED',
}

export type PostReactAction = {
  [PostActions.React]: {
    isEnable: boolean;
    reactionCounts: {
      [key in ReactionType]: number;
    };
  } & ({
    currentStatus: PostCurrentReactStatus.Reacted;
    currentUserReaction: ReactionType;
  } | {
    currentStatus: PostCurrentReactStatus.NotReacted;
  });
}

export type PostCommentAction = {
  [PostActions.Comment]: {
    isEnable: boolean;
    totalComments: number;
  };
}

export type PostShareAction = {
  [PostActions.Share]: {
    isEnable: boolean;
  };
}

export type PostEditAction = {
  [PostActions.Edit]: {
    isEnable: boolean;
  };
}

export type PostDeleteAction = {
  [PostActions.Delete]: {
    isEnable: boolean;
  };
}

export enum PostReportOptions {
  Spam = 'SPAM',
  Inappropriate = 'INAPPROPRIATE',
  HateSpeech = 'HATE_SPEECH',
  Violence = 'VIOLENCE',
  Other = 'OTHER',
}

export type PostReportAction = {
  [PostActions.Report]: {
    isEnable: boolean;
    reportOptions: PostReportOptions[];
  };
}

export type PostPrimaryActions = PostReactAction & PostCommentAction & PostShareAction;
export type PostAdditionalActions = PostEditAction & PostDeleteAction & PostReportAction;
