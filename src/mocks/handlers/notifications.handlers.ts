import { http, HttpResponse } from "msw";
import { generateNotification } from "../generators";
import _ from "lodash";
import { isAuthenticated } from "../utils/jwt";

export const notificationHandlers = [
  http.get("/notifications", async ({ request }) => {
    const user = await isAuthenticated(request);

    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || 0);
    const limit = Number(url.searchParams.get("limit") || 10);

    const notifications = _.times(limit, () =>
      generateNotification({ user, userId: user.id }),
    );

    return HttpResponse.json({
      notifications,
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
