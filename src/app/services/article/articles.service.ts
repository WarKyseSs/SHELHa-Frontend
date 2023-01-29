import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DtoInputArticle} from "../../dtos/article/dto-input-article";
import {Observable} from "rxjs";
import {DtoOutputCreateArticle} from "../../dtos/article/dto-output-create-article";
import {DtoOutputUpdateArticle} from "../../dtos/article/dto-output-update-article";

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  private static readonly ENTRY_POINT_URL = environment.apiURL + "articles";

  constructor(private _httpClient:HttpClient) { }

  fetchAll(): Observable<DtoInputArticle[]>
  {
    return this._httpClient.get<DtoInputArticle[]>(ArticlesService.ENTRY_POINT_URL);
  }

  create(dto: DtoOutputCreateArticle): Observable<DtoInputArticle>
  {
    return this._httpClient.post<DtoInputArticle>(ArticlesService.ENTRY_POINT_URL, dto, {withCredentials:true});
  }

  delete(id: number): Observable<any>
  {
    return this._httpClient.delete(`${ArticlesService.ENTRY_POINT_URL}/${id}`, {withCredentials:true});
  }

  update(dto: DtoOutputUpdateArticle): Observable<any>
  {
    return this._httpClient.put(ArticlesService.ENTRY_POINT_URL, dto, {withCredentials:true});
  }

  fetchArticleByUrl(urlArticle: string): Observable<DtoInputArticle> {
    return this._httpClient.get<DtoInputArticle>(`${ArticlesService.ENTRY_POINT_URL}/${urlArticle}`);
  }
}
