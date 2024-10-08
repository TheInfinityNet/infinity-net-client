import type { User } from "@/types/user.type";
import type { Post } from "@/types/post.type";
import type { Comment } from "@/types/comment.type";
import { faker } from "@faker-js/faker";
import { NotificationType } from "@/types/notification.type";
import type { BaseNotification, Notification } from "@/types/notification.type";
import {
  CommentReaction,
  MessageReaction,
  PostReaction,
  ReactionType,
} from "@/types/reaction.type";
import { Message } from "@/types/message.type";
import { Participant } from "@/types/participant.type";
import { Conversation } from "@/types/conversation.type";
import { FriendshipStatus } from "@/types/friend.type";
import { PostCurrentReactStatus, PostPrimaryActions } from "@/types/post-action.type";
import { PostActions } from "@/types/action.type";

export const generateUser = (user?: Partial<User>): User => ({
  id: faker.string.uuid(),
  avatar: faker.image.avatar(),
  cover: faker.image.url(),
  email: faker.internet.email(),
  bio: faker.lorem.paragraph(),
  username: faker.internet.userName(),
  firstName: faker.person.firstName(),
  lastName: faker.person.lastName(),
  middleName: faker.person.middleName(),
  name: faker.person.fullName(),
  mobileNumber: faker.phone.number(),
  birthdate: faker.date.past().toISOString(),
  acceptTerms: true,
  gender: faker.person.sex(),
  password: faker.internet.password(),
  ...user,
});

export const generateReactionType = (): ReactionType => {
  const types = Object.values(ReactionType);
  return types[faker.number.int({ min: 0, max: types.length - 1 })];
};

export const generateFriendshipStatus = (): FriendshipStatus => {
  const types = Object.values(FriendshipStatus);
  return types[faker.number.int({ min: 0, max: types.length - 1 })];
};

export const generatePostReaction = (
  reaction?: Partial<PostReaction>,
): PostReaction => {
  const userId = faker.string.uuid();
  return {
    id: faker.string.uuid(),
    userId,
    postId: faker.string.uuid(),
    type: generateReactionType(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...reaction,
  };
};

export const generateCommentReaction = (
  reaction?: Partial<CommentReaction>,
): CommentReaction => {
  const userId = faker.string.uuid();
  return {
    id: faker.string.uuid(),
    userId,
    commentId: faker.string.uuid(),
    type: generateReactionType(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...reaction,
  };
};

export const generateMessageReaction = (
  reaction?: Partial<MessageReaction>,
): MessageReaction => {
  const userId = faker.string.uuid();
  return {
    id: faker.string.uuid(),
    userId,
    messageId: faker.string.uuid(),
    type: generateReactionType(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...reaction,
  };
};

export const generateReactionCounts = (): Record<ReactionType, number> => {
  return {
    [ReactionType.Like]: faker.number.int({ min: 0, max: 100 }),
    [ReactionType.Love]: faker.number.int({ min: 0, max: 100 }),
    [ReactionType.Haha]: faker.number.int({ min: 0, max: 100 }),
    [ReactionType.Sad]: faker.number.int({ min: 0, max: 100 }),
    [ReactionType.Dislike]: faker.number.int({ min: 0, max: 100 }),
    [ReactionType.FoldedHands]: faker.number.int({ min: 0, max: 100 }),
    [ReactionType.Angry]: faker.number.int({ min: 0, max: 100 }),
  };
};

export const generatePostPrimaryActions = (
  primaryActions?: Partial<PostPrimaryActions>,
): PostPrimaryActions => {
  return {
    [PostActions.React]: {
      isEnable: faker.datatype.boolean(),
      ...(faker.datatype.boolean() ?
        {
          currentStatus: PostCurrentReactStatus.Reacted,
          currentUserReaction: generateReactionType()
        }
        : {
          currentStatus: PostCurrentReactStatus.NotReacted,
        }),
      reactionCounts: generateReactionCounts(),
    },
    [PostActions.Comment]: {
      isEnable: faker.datatype.boolean(),
      totalComments: faker.number.int({ min: 0, max: 100 }),
    },
    [PostActions.Share]: {
      isEnable: faker.datatype.boolean(),
    },
    ...primaryActions,
  };
}

export const generatePost = (post?: Partial<Post>): Post => {
  const userId = faker.string.uuid();
  const postId = faker.string.uuid();
  return {
    id: postId,
    userId,
    content: faker.lorem.paragraph(),
    commentCounts: faker.number.int({ min: 0, max: 100 }),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    primaryActions: generatePostPrimaryActions(),
    ...post,
  };
};

export const generateComment = (comment?: Partial<Comment>): Comment => {
  const userId = faker.string.uuid();
  const postId = faker.string.uuid();
  return {
    id: faker.string.uuid(),
    userId,
    postId,
    parentId: comment?.parentId ?? faker.string.uuid(),
    content: faker.lorem.paragraph(),
    childrenCount: faker.number.int({ min: 0, max: 10 }),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...comment,
  };
};

export const getRandomNotificationType = (): NotificationType => {
  const types = Object.values(NotificationType);
  return types[faker.number.int({ min: 0, max: types.length - 1 })];
};

const generateBaseNotification = (
  baseNotification?: Partial<BaseNotification>,
): BaseNotification => {
  const userId = faker.string.uuid();
  return {
    id: faker.string.uuid(),
    userId,
    isRead: faker.datatype.boolean(),
    createdAt: faker.date.past().toISOString(),
    ...baseNotification,
  };
};

export const generateNotification = (
  notification?: Partial<Notification>,
): Notification => {
  const type = notification?.type ?? getRandomNotificationType();
  switch (type) {
    case NotificationType.Comment:
      return {
        ...generateBaseNotification(),
        type,
        postId: faker.string.uuid(),
        commentId: faker.string.uuid(),
      };
    case NotificationType.Reply:
      return {
        ...generateBaseNotification(),
        type,
        postId: faker.string.uuid(),
        commentId: faker.string.uuid(),
        replyId: faker.string.uuid(),
      };
    case NotificationType.Follow:
      return {
        ...generateBaseNotification(),
        type,
        followerId: faker.string.uuid(),
      };
    case NotificationType.Message:
      return {
        ...generateBaseNotification(),
        type,
        messageId: faker.string.uuid(),
        contentPreview: faker.lorem.sentence(),
      };
    case NotificationType.Tag:
      return {
        ...generateBaseNotification(),
        type,
        postId: faker.string.uuid(),
        tagId: faker.string.uuid(),
      };
    case NotificationType.Mention:
      return {
        ...generateBaseNotification(),
        type,
        postId: faker.string.uuid(),
        mentionId: faker.string.uuid(),
      };
    case NotificationType.FriendRequest:
      return {
        ...generateBaseNotification(),
        type,
        requestId: faker.string.uuid(),
      };
    case NotificationType.GroupInvitation:
      return {
        ...generateBaseNotification(),
        type,
        groupId: faker.string.uuid(),
      };
    case NotificationType.Share:
      return {
        ...generateBaseNotification(),
        type,
        postId: faker.string.uuid(),
        sharedById: faker.string.uuid(),
      };
    case NotificationType.Reaction:
      return {
        ...generateBaseNotification(),
        type,
        postId: faker.string.uuid(),
        reactionType: faker.lorem.word(),
      };
    case NotificationType.Story:
      return {
        ...generateBaseNotification(),
        type,
        storyId: faker.string.uuid(),
      };
    default:
      throw new Error("Unknown notification type");
  }
};

export const generateMessage = (message?: Partial<Message>): Message => {
  const userId = faker.string.uuid();
  return {
    id: faker.string.uuid(),
    userId,
    conversationId: faker.string.uuid(),
    content: faker.lorem.sentence(),
    seenBy: [],
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...message,
  };
};

export const generateParticipant = (
  participant?: Partial<Participant>,
): Participant => {
  const userId = faker.string.uuid();
  return {
    id: faker.string.uuid(),
    userId,
    conversationId: faker.string.uuid(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...participant,
  };
};

export const generateConversation = (
  conversation?: Partial<Conversation>,
): Conversation => {
  return {
    id: faker.string.uuid(),
    participants: [],
    unreadCount: faker.number.int({ min: 0, max: 100 }),
    ...conversation,
  };
};
