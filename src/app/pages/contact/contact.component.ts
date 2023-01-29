import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  form: FormGroup = this._fb.group({
    lastname: ["", Validators.required],
    firstname: ["", Validators.required],
    email: ["", Validators.required],
    message: ["", Validators.required]
  });

  constructor(private _fb: FormBuilder) { }

  ngOnInit(): void {
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }
}
