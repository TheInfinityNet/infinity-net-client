import { http, HttpResponse } from "msw";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../constants";
import { paginate } from "../utils/pagination";
import { generateUser } from "../generators";

export const friendsHandlers = [
  http.get("/users/:userId/friends", ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);
    const query = url.searchParams.get("query") || "";

    const { items: friends, pagination } = paginate(100, offset, limit, () =>
      generateUser({
        ...(query && {
          firstName: query,
        }),
      }),
    );

    return HttpResponse.json({
      friends,
      metadata: {
        pagination,
      },
    });
  }),

  http.get("/users/:userId/friends/pending-requests", ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);

    const { items: pendingRequests, pagination } = paginate(
      100,
      offset,
      limit,
      () => generateUser(),
    );

    return HttpResponse.json({
      pendingRequests,
      metadata: {
        pagination,
      },
    });
  }),
];
