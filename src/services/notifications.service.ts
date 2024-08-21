import { AxiosInstance } from "axios";
import { Metadata } from "../types/api.type";
import { Notification } from "../types/notification.type";

export enum NotificationEndpoints {
  GetNotifications = "/notifications",
  MarkAsRead = "/notifications/:notificationId/mark-as-read",
  DeleteNotification = "/notifications/:notificationId",
}

export class NotificationsService {
  private static instance: NotificationsService | null = null;
  private readonly apiClient: AxiosInstance;

  private constructor(apiClient: AxiosInstance) {
    this.apiClient = apiClient;
  }

  static getInstance(apiClient: AxiosInstance) {
    if (
      !NotificationsService.instance ||
      apiClient !== NotificationsService.instance.apiClient
    ) {
      NotificationsService.instance = new NotificationsService(apiClient);
    }
    return NotificationsService.instance;
  }

  getNotifications(params: { offset: number; limit: number }) {
    return this.apiClient.get<{
      notifications: Notification[];
      metadata: Metadata;
    }>(NotificationEndpoints.GetNotifications, { params });
  }

  markAsRead(notificationId: string) {
    return this.apiClient.post(
      NotificationEndpoints.MarkAsRead.replace(
        ":notificationId",
        notificationId,
      ),
    );
  }

  deleteNotification(notificationId: string) {
    return this.apiClient.delete(
      NotificationEndpoints.DeleteNotification.replace(
        ":notificationId",
        notificationId,
      ),
    );
  }
}
