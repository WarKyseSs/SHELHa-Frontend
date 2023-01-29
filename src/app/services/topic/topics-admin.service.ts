import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DtoOutputCreateTopic} from "../../dtos/topic/dto-output-create-topic";
import {Observable} from "rxjs";
import {DtoInputTopic} from "../../dtos/topic/dto-input-topic";
import {DtoOutputUpdateTopic} from "../../dtos/topic/dto-output-update-topic";

@Injectable({
  providedIn: 'root'
})
export class TopicsAdminService {

  private static readonly ENTRY_POINT_URL = environment.apiURL + "topics";
  constructor(private _httpClient:HttpClient) { }

  create (dto: DtoOutputCreateTopic): Observable<DtoInputTopic>
  {
    return this._httpClient.post<DtoInputTopic>(TopicsAdminService.ENTRY_POINT_URL, dto);
  }

  update(dto: DtoOutputUpdateTopic): Observable<any>
  {
    return this._httpClient.put(TopicsAdminService.ENTRY_POINT_URL, dto);
  }

  fetchAll() : Observable<DtoInputTopic[]>{
    return this._httpClient.get<DtoInputTopic[]>(TopicsAdminService.ENTRY_POINT_URL);
  }

  delete(id: number): Observable<any>
  {
    return this._httpClient.delete(`${TopicsAdminService.ENTRY_POINT_URL}/${id}`);
  }
}
