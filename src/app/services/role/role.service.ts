import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputRole} from "../../dtos/user/dto-input-role";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private static readonly ENTRY_POINT_URL = environment.apiURL + "roles";
  constructor(private _httpClient:HttpClient) { }

  fetchAllRole() : Observable<DtoInputRole[]>{
    return this._httpClient.get<DtoInputRole[]>(RoleService.ENTRY_POINT_URL, {withCredentials:true});
  }

  fetchRoleById(id:number) : Observable<DtoInputRole>{
    return this._httpClient.get<DtoInputRole>(`${RoleService.ENTRY_POINT_URL}/${id}`);
  }
}
