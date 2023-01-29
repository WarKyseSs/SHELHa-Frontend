import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoOutputCreateComment} from "../../../dtos/comment/dto-output-create-comment";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DtoInputPost} from "../../../dtos/post/dto-input-posts";
import {SignInService} from "../../../services/user/sign-in.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-comment-create',
  templateUrl: './comment-create.component.html',
  styleUrls: ['./comment-create.component.css']
})
export class CommentCreateComponent implements OnInit {
  @Output()
  commentCreated: EventEmitter<DtoOutputCreateComment> = new EventEmitter<DtoOutputCreateComment>();
  @Output() commentUpdated : EventEmitter<DtoOutputCreateComment> = new EventEmitter<DtoOutputCreateComment>();

  @Input() postComment: DtoInputPost | null = null;
  form: FormGroup = this._fb.group({
    message: ['', Validators.required]
  });

  constructor(private _fb: FormBuilder, public serviceINSign: SignInService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
  }

  emitCommentCreated() {

    this.commentCreated.next({
      // @ts-ignore
      idPost: this.postComment?.idPost,
      idUser: -1,
      message: this.form.value.message
    });
    this.form.reset();
  }
}
