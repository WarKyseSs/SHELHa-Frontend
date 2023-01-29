import {Component, Input, OnInit, Output} from '@angular/core';
import {DtoInputTopic} from "../../../dtos/topic/dto-input-topic";
import {TopicsAdminService} from "../../../services/topic/topics-admin.service";
import {DtoOutputUpdateTopic} from "../../../dtos/topic/dto-output-update-topic";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-topics-admin-update',
  templateUrl: './topics-admin-update.component.html',
  styleUrls: ['./topics-admin-update.component.css']
})
export class TopicsAdminUpdateComponent implements OnInit {
  @Input() categoriesUpdate : DtoInputTopic[] = [];

  selected :number = 0;


  topicSelected: DtoInputTopic = {
    idCat : 1,
    nameCat: "",
    description: ""
  };

  @Output() topicUpdated: DtoOutputUpdateTopic = {
    idCat : 1,
    nameCat: "",
    description: ""
  };
  form: FormGroup = this._fb.group({
    idCat: [0, Validators.required],
    nameCat: [""],
    description: [""]
  });

  constructor(private _toastr: ToastrService, private _topicAdminService : TopicsAdminService, private _fb : FormBuilder) { }

  ngOnInit(): void {
    this.fetchAllTopics()
  }

  private fetchAllTopics(){
    this._topicAdminService.fetchAll().subscribe( topics => this.categoriesUpdate = topics);
  }

  emitTopicUpdate() {
    this.topicUpdated = {
      idCat : this.form.value.idCat,
      nameCat: this.form.value.nameCat,
      description: this.form.value.description
    };

    if(this.topicUpdated.nameCat == "" || this.topicUpdated.nameCat == null){
      this.topicUpdated.nameCat = this.topicSelected.nameCat;
    }

    if(this.topicUpdated.description == "" || this.topicUpdated.description == null){
      this.topicUpdated.description = this.topicSelected.description;
    }

    this.topicSelected =  {
      idCat : 1,
      nameCat: "",
      description: ""
    };

    this.updateTopic(this.topicUpdated);
    this.fetchAllTopics();
    this.form.reset();
    this._toastr.success("Le topic "+this.topicUpdated.nameCat+" a bien été modifié!");
  }

  updateTopic(dto: DtoOutputUpdateTopic) {
    this._topicAdminService.update(dto).subscribe(() => {
      let topic = this.categoriesUpdate.filter(topic => topic.idCat == dto.idCat)[0];
      let index = this.categoriesUpdate.indexOf(topic);
      this.categoriesUpdate.splice(index, 1, dto);
    });
  }

  SelectHandler(idCat: number) {
    for(let topic of this.categoriesUpdate){
      if(topic.idCat == idCat){
        this.topicSelected = {
          idCat: topic.idCat,
          nameCat: topic.nameCat,
          description: topic.description
        }
      }
    }
  }
}

