import apiClient from "../api-client";
import { Metadata } from "../types/api.type";
import { Notification } from "../types/notification.type";

export enum NotificationEndpoints {
  GetNotifications = "/notifications",
  MarkAsRead = "/notifications/:notificationId/mark-as-read",
  DeleteNotification = "/notifications/:notificationId",
}

const getNotifications = (params: { offset: number; limit: number }) =>
  apiClient.get<{
    notifications: Notification[];
    metadata: Metadata;
  }>(NotificationEndpoints.GetNotifications, {
    params,
  });

export default {
  getNotifications,
};
