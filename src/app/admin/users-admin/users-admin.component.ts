import {Component, Input, OnInit} from '@angular/core';
import {DtoInputUser} from "../../dtos/user/dto-input-user";
import {ActivatedRoute, Router} from "@angular/router";
import {SignUpService} from "../../services/user/sign-up.service";
import {SignInService} from "../../services/user/sign-in.service";
import {DtoOutputUpdateUser} from "../../dtos/user/dto-output-update-user";

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {

  @Input() users : DtoInputUser[] = []

  constructor(
    private _userService: SignUpService,
    private _route:ActivatedRoute,
    private _router:Router,
    public _signinService:SignInService
  ) { }

  ngOnInit(): void {
    this.fetchAllUsers();
    if(!this._signinService.isAdmin() && !this._signinService.isModo())
    {
      this._router.navigateByUrl("/forbidden");
    }
  }

  private fetchAllUsers(){
    this._userService.fetchAll().subscribe( users => this.users = users);
  }

  delete(dto: DtoInputUser) {
    this._userService.delete(dto.id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== dto.id);
    })
  }

  update(dto: DtoOutputUpdateUser) {
    this._userService.update(dto).subscribe((updatedUser) => {
        this.users = this.users.map((user) => {
          if (user === updatedUser) {
            return updatedUser;
          }
          return user;
        });
      }
    );
  }
}
