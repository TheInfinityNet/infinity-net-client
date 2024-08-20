import { http, HttpResponse } from "msw";
import { users } from "../data";
import _ from "lodash";
import {
  generatePost,
  generatePostReaction,
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
import { faker } from "@faker-js/faker";

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
          currentUserReaction: faker.datatype.boolean({ probability: 0.5 })
            ? generatePostReaction()
            : undefined,
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
          currentUserReaction: faker.datatype.boolean({ probability: 0.5 })
            ? generatePostReaction()
            : undefined,
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
      currentUserReaction: faker.datatype.boolean({ probability: 0.5 })
        ? generatePostReaction()
        : undefined,
    });

    return HttpResponse.json({
      post,
    });
  }),
];
