import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputUser} from "../../../dtos/user/dto-input-user";
import {DtoOutputUpdateUser} from "../../../dtos/user/dto-output-update-user";
import {RoleService} from "../../../services/role/role.service";
import {DtoInputRole} from "../../../dtos/user/dto-input-role";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-users-admin-list',
  templateUrl: './users-admin-list.component.html',
  styleUrls: ['./users-admin-list.component.css']
})
export class UsersAdminListComponent implements OnInit {

  roles : DtoInputRole[] = [];

  @Input() users: DtoInputUser[] = [];
  @Output() userDeleted : EventEmitter<DtoInputUser> = new EventEmitter<DtoInputUser>();
  @Output() userUpdated : EventEmitter<DtoOutputUpdateUser> = new EventEmitter<DtoOutputUpdateUser>();

  page: number = 1;
  count: number = 0;
  listSize: number = 5;
  listSizes: any = [5, 10, 15, 20, 50];
  userFilter: any;

  constructor(private _toastr: ToastrService, private _roleService:RoleService) { }

  ngOnInit(): void {
    this.fetchAllRole();
  }

  emitDelete(user: DtoInputUser) {
    if(window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      this.userDeleted.next(user);
      this._toastr.success("L'utilisateur a bien été supprimé avec succès!");
    }
  }

  onListDataChange(event: any) {
    this.page = event;
  }

  onListSizeChange(event: any) {
    this.listSize = event.target.value;
    this.page = 1;
  }

  private fetchAllRole(){
    this._roleService.fetchAllRole().subscribe(roles =>this.roles = roles);
  }

  onRoleChange(userUpdate: DtoInputUser, event: any) {
    const selectedValue = event.target.value;
    this.userUpdated.next({
      id: userUpdate.id,
      userRole: selectedValue,
      mailValidation: userUpdate.mailValidation,
      username: userUpdate.username,
      lastname: userUpdate.lastname,
      firstname: userUpdate.firstname,
      mailaddress: userUpdate.mailaddress,
      password: userUpdate.password,
      implantation: userUpdate.implantation,
      validatorkey:  userUpdate.validatorkey,
      connectionDate:  userUpdate.connectionDate,
      registrationDate:  userUpdate.registrationDate,
      changePassword: userUpdate.changePassword
    });
    this._toastr.success("Le role l'utilisateur "+userUpdate.username+" a bien été modifié avec succès!");
  }
}
