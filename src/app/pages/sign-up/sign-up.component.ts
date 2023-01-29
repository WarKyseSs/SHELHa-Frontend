import {Component, OnInit} from '@angular/core';
import {DtoOutputCreateUser} from "../../dtos/user/dto-output-create-user";
import {SignUpService} from "../../services/user/sign-up.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SignInService} from "../../services/user/sign-in.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  /*users : DtoInputUser[] = [];*/

  constructor(private _signUp: SignUpService,
              private _route: ActivatedRoute,
              private _router: Router,
              public _signinService:SignInService,
              private _toastr:ToastrService) {
  }

  ngOnInit(): void {
    if(this._signinService.isConnected())
    {
      this._router.navigateByUrl("/index");
    }
  }

  create(user: DtoOutputCreateUser)
  {
    this._signUp.create(user).subscribe(() =>
      this._router.navigateByUrl("/connection"),
        (err) =>
        {
        this._toastr.error(err.error)
        });
  }
}
