import { http, HttpResponse } from "msw";
import { generateComment } from "../generators";
import _ from "lodash";

export const commentsHandlers = [
  http.get("/posts/:postId/comments", ({ request, params }) => {
    const { postId } = params as { postId: string };
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset"));
    const limit = Number(url.searchParams.get("limit"));

    const comments = _.times(10, () =>
      generateComment({ postId, parentId: undefined }),
    );

    return HttpResponse.json({
      comments,
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
