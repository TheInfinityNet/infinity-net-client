import { http, HttpResponse } from "msw";
import {
  generateMessage,
  generateMessageReaction,
  generateReactionCounts,
  generateUser,
} from "../generators";
import { faker } from "@faker-js/faker";
import { paginate } from "../utils/pagination";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../constants";

export const messageReactionsHandlers = [
  http.get("/conversations/:conversationId/messages", ({ request, params }) => {
    const { conversationId } = params as { conversationId: string };
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);

    const { items: messages, pagination } = paginate(100, offset, limit, () =>
      generateMessage({
        conversationId,
        user: generateUser(),
        reactionCounts: generateReactionCounts(),
        currentUserReaction: faker.datatype.boolean({ probability: 0.5 })
          ? generateMessageReaction()
          : undefined,
      }),
    );

    return HttpResponse.json({
      messages,
      metadata: {
        pagination,
      },
    });
  }),
];
