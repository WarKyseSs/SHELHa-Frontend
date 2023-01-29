import {Component, OnInit} from '@angular/core';
import {SignInService} from "../services/user/sign-in.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(public _signinService: SignInService, private _router:Router) { }

  ngOnInit(): void {
    if(!this._signinService.isAdmin() && !this._signinService.isModo() && !this._signinService.isCommunityManager())
    {
      this._router.navigateByUrl("/forbidden");
    }
  }
}
