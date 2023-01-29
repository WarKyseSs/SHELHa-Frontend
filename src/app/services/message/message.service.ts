import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputMessage} from "../../dtos/message/dto-input-message";
import {DtoOutputMessage} from "../../dtos/message/dto-output-message";

@Injectable({
  providedIn: 'root'
})
export class MessageService
{
  private static readonly ENTRY_POINT_URL = environment.apiURL + "user/messaging";

  constructor(private http:HttpClient) { }

  /** get messages of conversations*/
  getMessages(slug:string): Observable<DtoInputMessage[]>
  {
    return this.http.get<DtoInputMessage[]>(MessageService.ENTRY_POINT_URL+"/conversation/"+slug,{withCredentials:true});
  }

  sendMessage(dto:DtoOutputMessage): Observable<string>
  {
    return this.http.post<string>(MessageService.ENTRY_POINT_URL,dto,{withCredentials:true});
  }


}
