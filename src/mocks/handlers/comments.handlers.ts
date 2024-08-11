import { http, HttpResponse } from "msw";
import { generateComment } from "../generators";
import _ from "lodash";
import { paginate } from "../utils/pagination";

export const commentsHandlers = [
  http.get("/posts/:postId/comments", ({ request, params }) => {
    const { postId } = params as { postId: string };
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset")) || 0;
    const limit = Number(url.searchParams.get("limit")) || 10;
    const totalCount = 24;

    const { items: comments, pagination } = paginate(
      totalCount,
      offset,
      limit,
      () => generateComment({ postId, parentId: undefined }),
    );
    return HttpResponse.json({
      comments,
      metadata: {
        pagination,
      },
    });
  }),

  http.get("/comments/:parentId/replies", ({ request, params }) => {
    const { parentId } = params as { parentId: string };
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset"));
    const limit = Number(url.searchParams.get("limit"));
    const totalCount = 36;

    const { items: comments, pagination } = paginate(
      totalCount,
      offset,
      limit,
      () => generateComment({ postId: undefined, parentId }),
    );

    return HttpResponse.json({
      comments,
      metadata: {
        pagination,
      },
    });
  }),
];
