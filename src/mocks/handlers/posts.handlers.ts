import { http, HttpResponse } from "msw";
import { users } from "../data";
import _ from "lodash";
import {
  generatePost,
  generateReactionCounts,
  generateUser,
} from "../generators";
import { paginate } from "../utils/pagination";
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  TOTAL_POSTS_IN_FEED_COUNT,
  TOTAL_POSTS_IN_PROFILE_COUNT,
} from "../constants";
import { isAuthenticated } from "../utils/jwt";
import { PostAdditionalActions, PostReportOptions } from "@/types/post-action.type";
import { PostActions } from "@/types/action.type";

export const postsHandlers = [
  http.get("/users/:userId/posts", ({ request, params }) => {
    const { userId } = params as { userId: string };
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);

    const user = users[userId] || generateUser({ id: userId });
    users[userId] = user;
    const { items: posts, pagination } = paginate(
      TOTAL_POSTS_IN_PROFILE_COUNT,
      offset,
      limit,
      () =>
        generatePost({
          user,
          reactionCounts: generateReactionCounts(),
        }),
    );

    return HttpResponse.json({
      posts,
      metadata: {
        pagination,
      },
    });
  }),

  http.get("/news-feed", ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);

    const { items: posts, pagination } = paginate(
      TOTAL_POSTS_IN_FEED_COUNT,
      offset,
      limit,
      () =>
        generatePost({
          user: generateUser(),
          reactionCounts: generateReactionCounts(),
        }),
    );

    return HttpResponse.json({
      posts,
      metadata: {
        pagination,
      },
    });
  }),

  http.get("/posts/:postId", ({ params }) => {
    const { postId } = params as { postId: string };
    const post = generatePost({
      id: postId,
      user: generateUser(),
      reactionCounts: generateReactionCounts(),
    });

    return HttpResponse.json({
      post,
    });
  }),

  http.post("/posts", async ({ request }) => {
    const user = await isAuthenticated(request)
    const { content } = await request.json() as { content: string };
    const post = generatePost({
      content,
      user,
      reactionCounts: generateReactionCounts(),
    });

    return HttpResponse.json({
      post,
    });
  }),

  http.get("/posts/:postId/actions/additional", async ({ request, params }) => {
    return HttpResponse.json<PostAdditionalActions>({
      [PostActions.Edit]: {
        isEnable: true,
      },
      [PostActions.Delete]: {
        isEnable: true,
      },
      [PostActions.Report]: {
        isEnable: true,
        reportOptions: Object.values(PostReportOptions),
      }
    });
  }),
];
