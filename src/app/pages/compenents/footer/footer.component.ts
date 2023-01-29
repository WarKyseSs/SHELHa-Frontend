import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SignInService} from "../../../services/user/sign-in.service";
import {SignUpService} from "../../../services/user/sign-up.service";
import {DtoInputUser} from "../../../dtos/user/dto-input-user";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  //@ts-ignore
  @Input() user: DtoInputUser;

  constructor(private _activatedRoute: ActivatedRoute, public _signinService: SignInService, private _router:Router, private _userService: SignUpService) { }

  ngOnInit(): void {
    this.fetch();
  }

  private fetch(){
    if(this._signinService.isConnected())
    {
      this._userService.fetch().subscribe(user => this.user = user);
    }
  }

  disconnect(){
    this._signinService.disconnect().subscribe();
    this._router.navigateByUrl('/index');
  }
}
