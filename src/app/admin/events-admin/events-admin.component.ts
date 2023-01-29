import { Component, OnInit } from '@angular/core';
import {SignInService} from "../../services/user/sign-in.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-events-admin',
  templateUrl: './events-admin.component.html',
  styleUrls: ['./events-admin.component.css']
})
export class EventsAdminComponent implements OnInit {

  constructor(private _signinService:SignInService, private _router:Router) { }

  ngOnInit(): void {
    if(!this._signinService.isAdmin() && !this._signinService.isCommunityManager())
    {
      this._router.navigateByUrl("/forbidden");
    }
  }
}
