export interface DtoInputConversation
{
  id: number;
  idUserOne: number;
  idUserTwo: number;
  usernameUserOne: string;
  usernameUserTwo: string;
  lastMessage: string;
  idUserRequesting: number;
  interlocutorUsername:string;
  slug:string;
  subject:string;
}
