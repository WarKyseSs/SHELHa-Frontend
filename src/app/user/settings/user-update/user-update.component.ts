import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {DtoInputUser} from "../../../dtos/user/dto-input-user";
import {DtoInputImplantation} from "../../../dtos/user/dto-input-implantation";
import {DtoOutputUpdateUser} from "../../../dtos/user/dto-output-update-user";
import {AbstractControl, FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {SignUpService} from "../../../services/user/sign-up.service";
import {ImplantationService} from "../../../services/implantation/implantation.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {

  //username: string |  = null;
  //@ts-ignore
  user: DtoInputUser;
  implantations : DtoInputImplantation[] = [];
  showPassword: boolean = false;

  @Output()
  userUpdated : EventEmitter<DtoOutputUpdateUser> = new EventEmitter<DtoOutputUpdateUser>();
  form: FormGroup = this._fb.group({
    username: [""],
    mailaddress : [""],
    password : [""],
    implantation : [""],
    showPassword: [false]
  });

  constructor(private toastr: ToastrService, private _fb: FormBuilder, private _activatedRoute:ActivatedRoute, private _userService: SignUpService, private _implantationService: ImplantationService, private _router: Router) {
    //@ts-ignore
    this.form.get('showPassword').valueChanges.subscribe(value => {
      this.showPassword = value;
    });
  }

  ngOnInit(): void {
    this.fetchAllImp();
    this.fetch();
  }

  emitUpdate(userUpdate: DtoInputUser)
  {
    if(this.showPassword == true){
      this.userUpdated.next({
        id: userUpdate.id,
        userRole: userUpdate.userRole,
        mailValidation: userUpdate.mailValidation,
        username: this.form.value.username,
        lastname: userUpdate.lastname,
        firstname: userUpdate.firstname,
        mailaddress: this.form.value.mailaddress,
        password: this.form.value.password,
        implantation: this.form.value.implantation,
        validatorkey:  userUpdate.validatorkey,
        connectionDate:  userUpdate.connectionDate,
        registrationDate:  userUpdate.registrationDate,
        changePassword: this.showPassword
      });
    }else{
      this.userUpdated.next({
        id: userUpdate.id,
        userRole: userUpdate.userRole,
        mailValidation: userUpdate.mailValidation,
        username: this.form.value.username,
        lastname: userUpdate.lastname,
        firstname: userUpdate.firstname,
        mailaddress: this.form.value.mailaddress,
        password: userUpdate.password,
        implantation: this.form.value.implantation,
        validatorkey:  userUpdate.validatorkey,
        connectionDate:  userUpdate.connectionDate,
        registrationDate:  userUpdate.registrationDate,
        changePassword: this.showPassword
      });
    }
    this.toastr.success("Votre compte a bien été à jour!");
    this._router.navigate([`/index`]);
  }

  private fetch(){
    this._userService
      .fetch()
      .subscribe(user => this.user = user);
  }

  private fetchAllImp(){
    this._implantationService.fetchAllImp().subscribe(implantations =>this.implantations = implantations);
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }
}
