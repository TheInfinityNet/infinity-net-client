import { http, HttpResponse } from "msw";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../constants";
import { paginate } from "../utils/pagination";
import { generateReaction, generateUser } from "../generators";
import { ReactionType } from "@/lib/api/types/reaction.type";

export const reactionsHandlers = [
  http.get("/posts/:postId/reactions", ({ request, params }) => {
    const { postId } = params as { postId: string };
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);
    const type = Object.values(ReactionType).find(
      (type) => type === url.searchParams.get("type"),
    ) as ReactionType | undefined;

    const { items: reactions, pagination } = paginate(100, offset, limit, () =>
      generateReaction({
        postId,
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
];
