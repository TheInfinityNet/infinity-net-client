import { z } from "zod";

export enum PostPrivacy {
  Public = 'PUBLIC',
  Private = 'PRIVATE',
  Friends = 'FRIENDS',
  Custom = 'CUSTOM',
}

export const CreatePostSchema = z.object({
  content: z.string().min(1).max(63206),
  privacy: z.enum(['PUBLIC', 'PRIVATE', 'FRIENDS']).optional().default('PUBLIC'),
  mediaItems: z.array(z.object({
    mediaType: z.enum(['IMAGE', 'VIDEO', 'GIF']),
    mediaId: z.string().min(1),
  })).optional().default([]),
  groupId: z.string().min(1).optional(),
  taggedUserIds: z.array(z.string().min(1)).optional().default([]),
  allowedUserIds: z.array(z.string().min(1)).optional().default([]),
  blockedUserIds: z.array(z.string().min(1)).optional().default([]),
});

