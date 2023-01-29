import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputImplantation} from "../../dtos/user/dto-input-implantation";

@Injectable({
  providedIn: 'root'
})
export class ImplantationService{

  private static readonly ENTRY_POINT_URL = environment.apiURL + "implantations";
  constructor(private _httpClient:HttpClient) { }

  fetchAllImp() : Observable<DtoInputImplantation[]>{
    return this._httpClient.get<DtoInputImplantation[]>(ImplantationService.ENTRY_POINT_URL);
  }

  fetchImpById(id:number) : Observable<DtoInputImplantation>{
    return this._httpClient.get<DtoInputImplantation>(`${ImplantationService.ENTRY_POINT_URL}/${id}`);
  }
}
