import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputComment} from "../../../dtos/comment/dto-input-comment";
import {DtoOutputUpdateComment} from "../../../dtos/comment/dto-output-update-comment";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {SignInService} from "../../../services/user/sign-in.service";
@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.css']
})
export class CommentListComponent implements OnInit {
  @Output() commentDeleted : EventEmitter<DtoInputComment> = new EventEmitter<DtoInputComment>();
  @Output() commentUpdated : EventEmitter<DtoOutputUpdateComment> = new EventEmitter<DtoOutputUpdateComment>();
  @Input()
  comments : DtoInputComment[] = [];
  page: number = 1;
  count: number = 0;
  listSize: number = 5;
  listSizes: any = [5, 10, 15, 20];
  element = false;

  commentFilter: any;
  form : FormGroup = this._fb.group({
    newComment : new FormControl('')
  });

  constructor(private _fb : FormBuilder, private toastr: ToastrService, public _signInService: SignInService) { }

  ngOnInit(): void {
  }

  onListDataChange(event: any) {
    this.page = event;
  }

  onListSizeChange(event: any) {
    this.listSize = event.target.value;
    this.page = 1;
  }

  emitDelete(comment: DtoInputComment) {
    if(window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?')) {
      this.commentDeleted.next(comment);
      this.toastr.success("Le commentaire a bien été supprimé avec succès!");
    }
  }

  emitUpdate(comment: DtoInputComment) {
    this.commentUpdated.next({
      idComment : comment.idComment,
      dateComment: comment.dateComment,
      idPost : comment.idPost,
      idUser : comment.idUser,
      message : this.form.value.newComment
    });
    this.hideData();
    this.toastr.success("Le commentaire a bien été modifié avec succès!");
  }

  showData(comment: DtoInputComment) {
    this.comments.forEach(i => i.isSelected = false);
    comment.isSelected = true;
    return (this.element = true);
  }
  hideData() {
    this.comments.forEach(i => i.isSelected = false);
    return (this.element = false);
  }
}
