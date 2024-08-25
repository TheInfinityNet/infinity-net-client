import { z } from "zod";
import { PostPrivacy } from "@/types/post.type";

export const CreatePostSchema = z.object({
  content: z.string().min(1).max(63206),
  privacy: z.nativeEnum(PostPrivacy).optional().default(PostPrivacy.Public),
  mediaItems: z.array(z.object({
    mediaType: z.enum(['IMAGE', 'VIDEO', 'GIF']),
    mediaId: z.string().min(1),
  })).optional().default([]),
  groupId: z.string().min(1).optional(),
  taggedUserIds: z.array(z.string().min(1)).optional().default([]),
  allowedUserIds: z.array(z.string().min(1)).optional().default([]),
  blockedUserIds: z.array(z.string().min(1)).optional().default([]),
});

