import { http, HttpResponse } from "msw";
import { generateUser } from "../generators";
import { HttpStatusCode } from "axios";

export const usersHandlers = [
  http.get("/users/:id", ({ params }) => {
    const { id } = params as { id: string };

    const user = generateUser({ id });

    return HttpResponse.json(
      {
        user,
      },
      {
        status: HttpStatusCode.Ok,
      },
    );
  }),
];
