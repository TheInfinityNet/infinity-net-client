import { http, HttpResponse } from "msw";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../constants";
import { paginate } from "../utils/pagination";
import { generateReaction } from "../generators";

export const reactionsHandlers = [
  http.get("/posts/:postId/reactions", ({ request, params }) => {
    const { postId } = params as { postId: string };
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);

    const { items: reactions, pagination } = paginate(100, offset, limit, () =>
      generateReaction({ postId }),
    );

    return HttpResponse.json({
      reactions,
      metadata: {
        pagination,
      },
    });
  }),
];
