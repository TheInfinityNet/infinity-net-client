export enum MessageEndpoints {
  GetMessagesByConversationId = "/conversations/:conversationId/messages",
  CreateMessageByConversationId = "/conversations/:conversationId/messages",
  UpdateMessage = "/messages/:messageId",
  DeleteMessage = "/messages/:messageId",
}
