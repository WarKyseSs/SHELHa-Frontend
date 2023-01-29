import {Component, Input, OnInit} from '@angular/core';
import {SignUpService} from "../../services/user/sign-up.service";
import {DtoOutputUpdateUser} from "../../dtos/user/dto-output-update-user";
import {DtoInputUser} from "../../dtos/user/dto-input-user";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() users: DtoInputUser[] = [];

  constructor(private _userService : SignUpService) { }

  ngOnInit(): void {
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
