import {Component, OnInit, Output} from '@angular/core';
import {DtoOutputCreateTopic} from "../../../dtos/topic/dto-output-create-topic";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {TopicsAdminService} from "../../../services/topic/topics-admin.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-topics-admin-create',
  templateUrl: './topics-admin-create.component.html',
  styleUrls: ['./topics-admin-create.component.css']
})
export class TopicsAdminCreateComponent implements OnInit {

  @Output() topicCreated: DtoOutputCreateTopic = {
    nameCat : "",
    description : ""
  }

  form: FormGroup = this._fb.group({
    nameCat: ["", Validators.required],
    description: ["", Validators.required]
  });

  constructor(private _toastr: ToastrService, private _fb: FormBuilder, private _topicService: TopicsAdminService) { }

  ngOnInit(): void {
  }

  emitTopic(){
    this.topicCreated ={
      nameCat: this.form.value.nameCat,
      description: this.form.value.description
    }
    this.createTopic(this.topicCreated);
    this.form.reset()
    this._toastr.success("Le topic "+this.topicCreated.nameCat+" a bien été ajouté!");
  }

  createTopic(dto : DtoOutputCreateTopic){
    this._topicService.create(dto).subscribe();
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }
}
