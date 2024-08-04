import { http, HttpResponse } from "msw";
import { generateUser } from "../generators";
import { HttpStatusCode } from "axios";
import { users } from "../data";

export const usersHandlers = [
  http.get("/users/:id", ({ params }) => {
    const { id } = params as { id: string };
    console.log("id", id);

    const user = users[id] || generateUser({ id });

    users[id] = user;

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
