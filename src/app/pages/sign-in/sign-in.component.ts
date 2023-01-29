import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputConnexion} from "../../dtos/user/dto-output-connexion";
import {SignInService} from "../../services/user/sign-in.service";
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit
{
  form: FormGroup = this._fb.group
  (
    {
    username: this._fb.control("",[Validators.required]),
    password: this._fb.control("",[Validators.required])
    }
  );

  @Output() userConnected: EventEmitter<DtoOutputConnexion> = new EventEmitter<DtoOutputConnexion>();
  dto: DtoOutputConnexion = {username:"",password:""};
  feedback: string = "";

  constructor(private toastr: ToastrService,private _fb: FormBuilder, private _signInService: SignInService, private _router:Router)
  {

  }

  ngOnInit(): void
  {
    if(this._signInService.isConnected())
    {
      this._router.navigateByUrl("/index");
    }
  }

  connection()
  {
    this.feedback="";
    this.dto.username = this.form.value.username;
    this.dto.password = this.form.value.password;

    this._signInService.connect(this.dto).subscribe(() =>

      this._router.navigateByUrl("/index"),
      (err) =>
      {
        this.toastr.error(err.error)
      });
  }

  get inputUsername():AbstractControl| null
  {
    return this.form.get("username");
  }

  get inputPassword():AbstractControl| null
  {
    return this.form.get("password");
  }
}
