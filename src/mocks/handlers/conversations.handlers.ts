import { http, HttpResponse } from "msw";
import { DEFAULT_LIMIT, DEFAULT_OFFSET } from "../constants";
import { paginate } from "../utils/pagination";
import { isAuthenticated } from "../utils/jwt";
import {
  generateConversation,
  generateMessage,
  generateParticipant,
  generateUser,
} from "../generators";
import { faker } from "@faker-js/faker";

export const conversationsHandlers = [
  http.get("/conversations", async ({ request }) => {
    const user = await isAuthenticated(request);
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);

    const { items: conversations, pagination } = paginate(
      100,
      offset,
      limit,
      () =>
        generateConversation({
          participants: [
            generateParticipant({ userId: user.id, user }),
            generateParticipant({ user: generateUser() }),
          ],
          unreadCount: faker.number.int({ min: 0, max: 100 }),
          lastMessage: generateMessage(),
        }),
    );

    return HttpResponse.json({
      conversations,
      metadata: {
        pagination,
      },
    });
  }),

  http.get("/conversations/:conversationId", async ({ request, params }) => {
    await isAuthenticated(request);
    const { conversationId } = params as { conversationId: string };

    return HttpResponse.json({
      conversation: generateConversation({
        id: conversationId,
        participants: [
          generateParticipant({ user: generateUser() }),
          generateParticipant({ user: generateUser() }),
        ],
        unreadCount: faker.number.int({ min: 0, max: 100 }),
        lastMessage: generateMessage(),
      }),
    });
  }),

  http.post("/conversations", async ({ request }) => {
    const user = await isAuthenticated(request);

    return HttpResponse.json({
      conversation: generateConversation({
        participants: [
          generateParticipant({ user }),
          generateParticipant({ user: generateUser() }),
        ],
        unreadCount: 0,
        lastMessage: generateMessage(),
      }),
    });
  }),

  http.put("/conversations/:conversationId", async ({ request, params }) => {
    await isAuthenticated(request);
    const { conversationId } = params as { conversationId: string };

    return HttpResponse.json({
      conversation: generateConversation({
        id: conversationId,
        participants: [
          generateParticipant({ user: generateUser() }),
          generateParticipant({ user: generateUser() }),
        ],
        unreadCount: 0,
        lastMessage: generateMessage(),
      }),
    });
  }),

  http.delete("/conversations/:conversationId", async ({ request, params }) => {
    await isAuthenticated(request);
    const { conversationId } = params as { conversationId: string };

    return HttpResponse.json({
      conversation: generateConversation({
        id: conversationId,
        participants: [
          generateParticipant({ user: generateUser() }),
          generateParticipant({ user: generateUser() }),
        ],
        unreadCount: 0,
        lastMessage: generateMessage(),
      }),
    });
  }),
];
