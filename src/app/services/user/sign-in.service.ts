import {Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {DtoOutputConnexion} from "../../dtos/user/dto-output-connexion";
import {Observable} from "rxjs";
import * as jwt from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class SignInService
{
  private static readonly ENTRY_POINT_URL = environment.apiURL + "Connexion";


  constructor(private _httpClient: HttpClient)
  {

  }

  connect(dto: DtoOutputConnexion): Observable<any>
  {
    return this._httpClient.post(SignInService.ENTRY_POINT_URL + "/log",dto,{withCredentials:true})
  }

  disconnect(){
    return this._httpClient.get(SignInService.ENTRY_POINT_URL + "/logOut",{withCredentials:true})
  }


  getIdOfUserConnected(): Observable<number>
  {
    return this._httpClient.get<number>(SignInService.ENTRY_POINT_URL+"/idOfUserConnected",{withCredentials:true});
  }

  private getCookie(name: string)
  {
    let ca: Array<string> = document.cookie.split(';');

    let caLen: number = ca.length;
    let cookieName = `${name}=`;
    let c: string;

    for (let i: number = 0; i < caLen; i += 1)
    {
      c = ca[i].replace(/^\s+/g, '');
      if (c.indexOf(cookieName) == 0)
      {
        return c.substring(cookieName.length, c.length);
      }
    }
    return '';
  }

  private DecodeToken(token: string): string
  {
    return jwt.default(token);
  }

  getRole():string
  {
    let cookie = this.DecodeToken(this.getCookie("tokenCookieRole"));
    let result = Object.entries(cookie);
    return(result[0][1].toString());
  }

  isConnected():boolean
  {
    return this.getCookie("tokenCookieRole").length > 0;
  }

  isAdmin():boolean
  {
    if(this.isConnected())
    {
      return this.getRole()=="Administrateur";
    }
    return false;
  }

  isCommunityManager():boolean
  {
    if(this.isConnected())
    {
      return this.getRole()=="Community manager";
    }
    return false;
  }

  isStudent():boolean
  {
    if(this.isConnected())
    {
      return this.getRole()=="Etudiant";
    }
    return false;
  }

  isGuest():boolean
  {
    if(this.isConnected())
    {
      return this.getRole()=="Invité";
    }
    return false;
  }

  isModo():boolean
  {
    if(this.isConnected())
    {
      return this.getRole()=="Modérateur";
    }
    return false;
  }



}
