import { http, HttpResponse } from "msw";
import { users } from "../data";
import _ from "lodash";
import { generatePost } from "../generators";

export const postsHandlers = [
  http.get("/users/:userId/posts", ({ request, params }) => {
    const { userId } = params as { userId: string };
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset"));
    const limit = Number(url.searchParams.get("limit"));

    const user = users[userId];

    return HttpResponse.json({
      posts: _.times(10, () => generatePost({ user })),
      metadata: {
        pagination: {
          offset,
          limit,
          nextOffset: offset + limit,
        },
      },
    });
  }),

  http.get("/news-feed", ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset"));
    const limit = Number(url.searchParams.get("limit"));

    return HttpResponse.json({
      posts: _.times(10, () => generatePost()),
      metadata: {
        pagination: {
          offset,
          limit,
          nextOffset: offset + limit,
        },
      },
    });
  }),
];
