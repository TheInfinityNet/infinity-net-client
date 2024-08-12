import { faker } from "@faker-js/faker";
import { HttpStatusCode } from "axios";
import { http, HttpResponse } from "msw";

export const mediaHandlers = [
  http.post("/media", async ({ request }) => {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return HttpResponse.json(
        {
          error: "No file provided",
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    if (!(file instanceof File)) {
      return HttpResponse.json(
        {
          error: "Invalid file provided",
        },
        {
          status: HttpStatusCode.BadRequest,
        },
      );
    }

    let url = "";
    let type = file.type;
    let size = file.size;
    switch (file.type) {
      case "image/png":
      case "image/jpeg":
        url = faker.image.url();
        break;
      case "video/mp4":
        url = "https://www.w3schools.com/html/mov_bbb.mp4";
        break;
      default:
        return HttpResponse.json(
          {
            error: "Invalid file type",
          },
          {
            status: HttpStatusCode.BadRequest,
          },
        );
    }

    return HttpResponse.json(
      {
        file: {
          id: faker.string.uuid(),
          url,
          type,
          size,
          createdAt: new Date().toISOString(),
        },
      },
      {
        status: HttpStatusCode.Created,
      },
    );
  }),
];
