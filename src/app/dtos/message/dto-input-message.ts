export interface DtoInputMessage
{
  id: number;
  idConversation: number;
  idSender: number;
  message: string;
  timestamp: string;
  isRead: boolean;
  usernameOfSender:string;
}
