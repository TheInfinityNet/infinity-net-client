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

