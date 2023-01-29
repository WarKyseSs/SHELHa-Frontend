import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputPost} from "../../dtos/post/dto-input-posts";
import {DtoOutputCreatePost} from "../../dtos/post/dto-output-create-post";
import {DtoInputComment} from "../../dtos/comment/dto-input-comment";
import {DtoOutputUpdatePost} from "../../dtos/post/dto-output-update-post";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  private static readonly ENTRY_POINT_URL = environment.apiURL + "post";
  constructor(private _httpClient:HttpClient) { }

  create(dto: DtoOutputCreatePost): Observable<DtoInputPost>
  {
    return this._httpClient.post<DtoInputPost>(PostsService.ENTRY_POINT_URL, dto, {withCredentials: true});
  }

  fetchPostByUrl(urlPost: string): Observable<DtoInputPost>
  {
    return this._httpClient.get<DtoInputPost>(`${PostsService.ENTRY_POINT_URL}/${urlPost}`, {withCredentials: true});
  }

  fetchCommentsByUrl(urlTopic : string) : Observable<DtoInputComment[]>{
    return this._httpClient.get<DtoInputComment[]>(`${PostsService.ENTRY_POINT_URL}/${urlTopic}/comments`, {withCredentials: true});
  }

  update(dto : DtoOutputUpdatePost) : Observable<any>{
    return this._httpClient.put(PostsService.ENTRY_POINT_URL, dto, {withCredentials: true});
  }

  delete(id : number) : Observable<any>{
    return this._httpClient.delete(PostsService.ENTRY_POINT_URL + "/" + id, {withCredentials: true});
  }
}
