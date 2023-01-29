import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputUser} from "../../dtos/user/dto-input-user";
import {DtoOutputCreateUser} from "../../dtos/user/dto-output-create-user";
import {DtoOutputUpdateUser} from "../../dtos/user/dto-output-update-user";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  private static readonly ENTRY_POINT_URL = environment.apiURL + "users";
  constructor(private _httpClient:HttpClient) { }

  create(dto: DtoOutputCreateUser): Observable<DtoInputUser> {
    return this._httpClient.post<DtoInputUser>(SignUpService.ENTRY_POINT_URL, dto);
  }

  fetchAll(): Observable<DtoInputUser[]> {
    return this._httpClient.get<DtoInputUser[]>(SignUpService.ENTRY_POINT_URL, {withCredentials:true});
  }

  delete(id : number) : Observable<any>{
    return this._httpClient.delete(SignUpService.ENTRY_POINT_URL + "/" + id, {withCredentials:true});
  }

  update(dto: DtoOutputUpdateUser) : Observable<any>{
    return this._httpClient.put(SignUpService.ENTRY_POINT_URL, dto, {withCredentials:true});
  }

  fetchUserById(id: number): Observable<DtoInputUser> {
    return this._httpClient.get<DtoInputUser>(`${SignUpService.ENTRY_POINT_URL}/${id}`, {withCredentials:true});
  }

  fetchUserByUsername(username: string): Observable<DtoInputUser> {
    return this._httpClient.get<DtoInputUser>(`${SignUpService.ENTRY_POINT_URL}/${username}`, {withCredentials:true});
  }

  fetch(): Observable<DtoInputUser> {
    return this._httpClient.get<DtoInputUser>(SignUpService.ENTRY_POINT_URL + "/profil", {withCredentials:true});
  }
}
