import { http, HttpResponse } from "msw";
import { paginate } from "../utils/pagination";
import { generateMessage, generateUser } from "../generators";
import _ from "lodash";
import { isAuthenticated } from "../utils/jwt";
import { faker } from "@faker-js/faker";

export const messagesHandlers = [
  http.get(
    "/conversations/:conversationId/messages",
    async ({ request, params }) => {
      const { conversationId } = params as { conversationId: string };
      const user = await isAuthenticated(request);

      const { items: messages, pagination } = paginate(100, 0, 10, () =>
        generateMessage({
          conversationId,
          seenBy: _.times(_.random(1, 5), () => generateUser()),
          user: faker.datatype.boolean() ? generateUser() : user,
        }),
      );

      return HttpResponse.json({
        messages,
        metadata: {
          pagination,
        },
      });
    },
  ),

  http.post(
    "/conversations/:conversationId/messages",
    async ({ request, params }) => {
      const { conversationId } = params as { conversationId: string };
      const user = await isAuthenticated(request);
      const data = (await request.json()) as { content: string };

      const message = generateMessage({
        conversationId,
        userId: user.id,
        content: data.content,
        user,
      });

      return HttpResponse.json({
        message,
      });
    },
  ),

  http.put(
    "/conversations/:conversationId/messages/:messageId",
    async ({ request, params }) => {
      const { conversationId, messageId } = params as {
        conversationId: string;
        messageId: string;
      };
      await isAuthenticated(request);
      const data = (await request.json()) as { content: string };

      return HttpResponse.json({
        message: generateMessage({
          id: messageId,
          conversationId,
          content: data.content,
        }),
      });
    },
  ),

  http.delete(
    "/conversations/:conversationId/messages/:messageId",
    async ({ request, params }) => {
      const { conversationId, messageId } = params as {
        conversationId: string;
        messageId: string;
      };
      await isAuthenticated(request);

      return HttpResponse.json({
        message: generateMessage({
          id: messageId,
          conversationId,
          content: "",
          deletedAt: new Date().toISOString(),
        }),
      });
    },
  ),
];
