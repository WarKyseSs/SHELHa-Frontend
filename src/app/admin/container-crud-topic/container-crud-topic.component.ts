import { Component, OnInit } from '@angular/core';
import {SignInService} from "../../services/user/sign-in.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-container-crud-topic',
  templateUrl: './container-crud-topic.component.html',
  styleUrls: ['./container-crud-topic.component.css']
})
export class ContainerCrudTopicComponent implements OnInit {

  constructor(private _signinService:SignInService, private _router:Router) { }

  ngOnInit(): void {
    if(!this._signinService.isAdmin() && !this._signinService.isModo())
    {
      this._router.navigateByUrl("/forbidden");
    }
  }
}
