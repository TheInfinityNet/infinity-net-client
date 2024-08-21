import { http, HttpResponse } from "msw";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../constants";
import { paginate } from "../utils/pagination";
import { generateCommentReaction, generateUser } from "../generators";
import { ReactionType } from "@/types/reaction.type";

export const commentReactionsHandlers = [
  http.get("/comments/:commentId/reactions", ({ request, params }) => {
    const { commentId } = params as { commentId: string };
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);
    const type = Object.values(ReactionType).find(
      (type) => type === url.searchParams.get("type"),
    ) as ReactionType | undefined;

    const { items: reactions, pagination } = paginate(100, offset, limit, () =>
      generateCommentReaction({
        commentId,
        user: generateUser(),
        ...(type && {
          type,
        }),
      }),
    );

    return HttpResponse.json({
      reactions,
      metadata: {
        pagination,
      },
    });
  }),

  http.post("/comments/:commentId/reactions", async ({ params, request }) => {
    const { commentId } = params as { commentId: string };
    const { type } = (await request.json()) as { type: ReactionType };

    return HttpResponse.json({
      reaction: generateCommentReaction({
        commentId,
        user: generateUser(),
        type,
      }),
    });
  }),

  http.delete("/comments/:commentId/reactions", async ({ params }) => {
    const { commentId } = params as { commentId: string };

    return HttpResponse.json({
      reaction: generateCommentReaction({
        commentId,
        user: generateUser(),
      }),
    });
  }),
];
