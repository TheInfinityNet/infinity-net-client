import { http, HttpResponse } from "msw";
import { generateUser } from "../generators";
import { paginate } from "../utils/pagination";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../constants";

export const followsHandlers = [
  http.get("/users/:userId/follows/followers", ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);

    const { items: followers, pagination } = paginate(100, offset, limit, () =>
      generateUser(),
    );

    return HttpResponse.json({
      followers,
      metadata: {
        pagination,
      },
    });
  }),

  http.get("/users/:userId/follows/followees", ({ request }) => {
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);

    const { items: followees, pagination } = paginate(100, offset, limit, () =>
      generateUser(),
    );

    return HttpResponse.json({
      followees,
      metadata: {
        pagination,
      },
    });
  }),
];
