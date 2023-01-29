import { Injectable } from '@angular/core';
import {DtoInputConversation} from "../../dtos/conversation/dto-input-conversation";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {DtoOutputConversation} from "../../dtos/conversation/dto-output-conversation";

@Injectable({
  providedIn: 'root'
})
export class ConversationService
{
  private static readonly ENTRY_POINT_URL = environment.apiURL + "user/conversation";
  constructor(private http:HttpClient) { }

  /** get conversations of user connected*/
  getConversations(): Observable<DtoInputConversation[]>
  {
    return this.http.get<DtoInputConversation[]>(ConversationService.ENTRY_POINT_URL+"/UserConnected",{withCredentials:true});
  }

  createConversation(dto: DtoOutputConversation): Observable<DtoInputConversation>
  {
    return this.http.post<DtoInputConversation>(ConversationService.ENTRY_POINT_URL,dto,{withCredentials:true});
  }

  getBySlug(slug:string): Observable<DtoInputConversation>
  {
    return this.http.get<DtoInputConversation>(ConversationService.ENTRY_POINT_URL+"/"+slug,{withCredentials:true});
  }

  /** allow to know who is the receiver (for allow to display username in the conversation list*/
  getOtherParticipantUsername(conversation: DtoInputConversation): string
  {
    if (conversation.idUserOne === conversation.idUserRequesting)
    {
      return conversation.usernameUserTwo;
    }
    else
    {
      return conversation.usernameUserOne;
    }
  }

  getConnectedParticipantUsername(conversation: DtoInputConversation): string
  {
    if (conversation.idUserOne === conversation.idUserRequesting)
    {
      return conversation.usernameUserOne;
    }
    else
    {
      return conversation.usernameUserTwo;
    }
  }

  getOtherParticipantId(conversation: DtoInputConversation): number
  {
    if (conversation.idUserOne === conversation.idUserRequesting)
    {
      return conversation.idUserTwo;
    }
    else
    {
      return conversation.idUserOne;
    }
  }

}
