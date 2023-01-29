import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoOutputCreatePost} from "../../../dtos/post/dto-output-create-post";
import {PostsService} from "../posts.service";
import {DtoInputPost} from "../../../dtos/post/dto-input-posts";
import {DtoInputTopics} from "../../../dtos/topic/dto-input-topics";
import {TopicsService} from "../../../services/topic/topics.service";
import {ToastrService} from "ngx-toastr";
import {SignInService} from "../../../services/user/sign-in.service";


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Input() posts : DtoInputPost[] = [];
  @Output() postCreated: EventEmitter<DtoOutputCreatePost> = new EventEmitter<DtoOutputCreatePost>();

  form: FormGroup = this._fb.group({
    idCat: ["", Validators.required],
    message: ["", Validators.required],
    sujet: ["", Validators.required]
  });
  topics: DtoInputTopics[] = [];
  element = false;

  constructor(private _fb: FormBuilder,  private _postService: PostsService, private _topicService : TopicsService,
              private toastr: ToastrService, public _signInService: SignInService) { }

  ngOnInit(): void {
    this.fetchAllTopics();
  }

  emitPost(){
    this.postCreated.next({
      idAuthor: -1,
      idCat: this.form.value.idCat,
      message: this.form.value.message,
      sujet: this.form.value.sujet,
      datePost: new Date(),
      dateLastEdit: new Date()
    })
    this.form.reset();
    this.hideData();
    this.toastr.success("Le post a bien été ajouté avec succès!");
  }


  private fetchAllTopics(){
    this._topicService.fetchAll().subscribe( topics => this.topics = topics);
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }

  showData() {
    return (this.element = true);
  }
  hideData() {
    return (this.element = false);
  }
}
