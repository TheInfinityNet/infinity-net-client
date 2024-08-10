import apiClient from "../api-client";
import { Metadata } from "../types/api.type";
import { Notification } from "../types/notification.type";

export enum NotificationEndpoints {
  GetNotifications = "/notifications",
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
