import {
  ProfileEndpoints,
  GetProfileResponse,
  UpdateProfileInput,
  UpdateProfileResponse,
} from "@/types/profile.type";
import { AxiosInstance } from "axios";

export class ProfileService {
  private static instance: ProfileService | null = null;
  private readonly apiClient: AxiosInstance;

  private constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  static getInstance(apiClient: AxiosInstance) {
    if (
      !ProfileService.instance ||
      apiClient !== ProfileService.instance.apiClient
    ) {
      ProfileService.instance = new ProfileService(apiClient);
    }
    return ProfileService.instance;
  }

  getProfile() {
    return this.apiClient.get<GetProfileResponse>(ProfileEndpoints.GetProfile);
  }

  updateProfile(data: UpdateProfileInput) {
    return this.apiClient.put<UpdateProfileResponse>(
      ProfileEndpoints.UpdateProfile,
      data,
    );
  }
}
