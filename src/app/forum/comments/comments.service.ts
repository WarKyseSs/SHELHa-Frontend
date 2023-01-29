
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {DtoInputComment} from "../../dtos/comment/dto-input-comment";
import {DtoOutputCreateComment} from "../../dtos/comment/dto-output-create-comment";
import {Injectable} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  private static readonly ENTRY_POINT_URL = environment.apiURL + "comment";
  constructor(private _httpClient:HttpClient) { }

  create(dto: DtoOutputCreateComment): Observable<DtoInputComment>
  {
    return this._httpClient.post<DtoInputComment>(CommentsService.ENTRY_POINT_URL, dto, {withCredentials: true});
  }

  updateComment(dto: DtoOutputCreateComment): Observable<any>
  {
    return this._httpClient.put(CommentsService.ENTRY_POINT_URL, dto, {withCredentials: true});
  }

  delete(id : number) : Observable<any>{
    return this._httpClient.delete(CommentsService.ENTRY_POINT_URL + "/" + id, {withCredentials: true});
  }
}
