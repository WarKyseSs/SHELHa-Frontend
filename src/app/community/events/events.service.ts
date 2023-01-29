import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputEvent} from "../../dtos/event/dto-input-event";
import {DtoOutputCreateEvent} from "../../dtos/event/dto-output-create-event";
import {DtoOutputUpdateEvent} from "../../dtos/event/dto-output-update-event";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  private static readonly ENTRY_POINT_URL = environment.apiURL + "events";

  constructor(private _httpClient:HttpClient) { }

  fetchAll(): Observable<DtoInputEvent[]>
  {
    return this._httpClient.get<DtoInputEvent[]>(EventsService.ENTRY_POINT_URL);
  }

  create(dto: DtoOutputCreateEvent): Observable<DtoInputEvent>
  {
    return this._httpClient.post<DtoInputEvent>(EventsService.ENTRY_POINT_URL, dto, {withCredentials:true});
  }

  delete(id: number): Observable<any>
  {
    return this._httpClient.delete(`${EventsService.ENTRY_POINT_URL}/${id}`, {withCredentials:true});
  }

  update(dto: DtoOutputUpdateEvent): Observable<any>
  {
    return this._httpClient.put(EventsService.ENTRY_POINT_URL, dto, {withCredentials:true});
  }

  fetchEventByUrl(urlEvent: string): Observable<DtoInputEvent> {
    return this._httpClient.get<DtoInputEvent>(`${EventsService.ENTRY_POINT_URL}/${urlEvent}`);
  }
}
