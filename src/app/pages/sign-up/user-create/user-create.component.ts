import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoInputImplantation} from "../../../dtos/user/dto-input-implantation";
import {DtoOutputCreateUser} from "../../../dtos/user/dto-output-create-user";
import {ImplantationService} from "../../../services/implantation/implantation.service";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  implantations : DtoInputImplantation[] = [];

  @Output()
  userCreated: EventEmitter<DtoOutputCreateUser> = new EventEmitter<DtoOutputCreateUser>();
  form: FormGroup = this._fb.group({
    username: ['', Validators.required],
    lastname: ['', Validators.required],
    firstname: ['', Validators.required],
    mailaddress : ['', [Validators.pattern('^[\\w\\.]+\\@([\\w-]+\\.)+[\\w-]{2,4}$'),Validators.required]],
    password : ['', [Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}'),Validators.required]],
    implantation : ['', Validators.required]
  });

  constructor(private toastr: ToastrService, private _fb: FormBuilder, private _implantation: ImplantationService, private _router: Router) { }

  ngOnInit(): void {
    this.fetchAllImp();
  }

  emitUser() {
    this.userCreated.next({
      username: this.form.value.username,
      lastname: this.form.value.lastname,
      firstname: this.form.value.firstname,
      mailaddress: this.form.value.mailaddress,
      password: this.form.value.password,
      implantation: this.form.value.implantation
    });
    this.form.reset();
  }

  private fetchAllImp(){
    this._implantation.fetchAllImp().subscribe(implantations =>this.implantations = implantations);
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }
}
