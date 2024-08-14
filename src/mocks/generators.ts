import type { User } from "@/lib/api/types/user.type";
import type { Post } from "@/lib/api/types/post.type";
import type { Comment } from "@/lib/api/types/comment.type";
import { faker } from "@faker-js/faker";
import { NotificationType } from "@/lib/api/types/notification.type";
import type {
  BaseNotification,
  Notification,
} from "@/lib/api/types/notification.type";
import { Reaction, ReactionType } from "@/lib/api/types/reaction.type";

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

export const generateReaction = (reaction?: Partial<Reaction>): Reaction => {
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
