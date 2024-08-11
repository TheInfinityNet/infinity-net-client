import { http, HttpResponse } from "msw";
import { generateNotification } from "../generators";
import _ from "lodash";
import { isAuthenticated } from "../utils/jwt";
import { paginate } from "../utils/pagination";
import {
  DEFAULT_LIMIT,
  DEFAULT_OFFSET,
  TOTAL_NOTIFICATIONS_COUNT,
} from "../constants";

export const notificationHandlers = [
  http.get("/notifications", async ({ request }) => {
    const user = await isAuthenticated(request);
    const url = new URL(request.url);
    const offset = Number(url.searchParams.get("offset") || DEFAULT_OFFSET);
    const limit = Number(url.searchParams.get("limit") || DEFAULT_LIMIT);

    const { items: notifications, pagination } = paginate(
      TOTAL_NOTIFICATIONS_COUNT,
      offset,
      limit,
      () => generateNotification({ user, userId: user.id }),
    );

    return HttpResponse.json({
      notifications,
      metadata: {
        pagination,
      },
    });
  }),
];
