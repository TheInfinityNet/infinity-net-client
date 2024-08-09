import {
  GetProfileResponse,
  ProfileEndpoints,
} from "@/lib/api/services/profile.service";
import { http, HttpResponse, PathParams } from "msw";
import { isAuthenticated } from "../utils/jwt";

export const profileHandlers = [
  http.get<PathParams, {}, GetProfileResponse, ProfileEndpoints.GetProfile>(
    ProfileEndpoints.GetProfile,
    async ({ request }) => {
      const user = await isAuthenticated(request);

      return HttpResponse.json({
        user: user,
      });
    },
  ),
];
