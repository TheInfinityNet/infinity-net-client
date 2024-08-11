import { http, HttpResponse } from "msw";
import { users } from "../data";
import _ from "lodash";
import { generatePost } from "../generators";
import { paginate } from "../utils/pagination";

export const postsHandlers = [
  http.get("/users/:userId/posts", ({ request, params }) => {
    const { userId } = params as { userId: string };
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset"));
    const limit = Number(url.searchParams.get("limit"));
    const totalCount = 64;

    const user = users[userId];

    const { items: posts, pagination } = paginate(
      totalCount,
      offset,
      limit,
      () => generatePost({ user }),
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
    const offset = Number(url.searchParams.get("offset"));
    const limit = Number(url.searchParams.get("limit"));
    const totalCount = 64;

    const { items: posts, pagination } = paginate(
      totalCount,
      offset,
      limit,
      () => generatePost(),
    );

    return HttpResponse.json({
      posts,
      metadata: {
        pagination,
      },
    });
  }),
];
