import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputTopics} from "../../dtos/topic/dto-input-topics";
import {DtoInputPost} from "../../dtos/post/dto-input-posts";

@Injectable({
  providedIn: 'root'
})
export class TopicsService {

  private static readonly ENTRY_POINT_URL = environment.apiURL + "topics";
  constructor(private _httpClient:HttpClient) { }

  fetchAll() : Observable<DtoInputTopics[]>{
    return this._httpClient.get<DtoInputTopics[]>(TopicsService.ENTRY_POINT_URL);
  }

  fetchPostsByUrl(urlTopic : string) : Observable<DtoInputPost[]>{
    return this._httpClient.get<DtoInputPost[]>(`${TopicsService.ENTRY_POINT_URL}/${urlTopic}/posts`, {withCredentials: true});
  }
}
