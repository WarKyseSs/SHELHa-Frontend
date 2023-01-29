import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DtoInputPost} from "../../../dtos/post/dto-input-posts";
import {PostsService} from "../posts.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {DtoOutputUpdatePost} from "../../../dtos/post/dto-output-update-post";
import {ToastrService} from "ngx-toastr";
import {SignInService} from "../../../services/user/sign-in.service";

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {
  @Input() posts: DtoInputPost[] = [];
  @Output() postDeleted : EventEmitter<DtoInputPost> = new EventEmitter<DtoInputPost>();
  @Output() postUpdated : EventEmitter<DtoOutputUpdatePost> = new EventEmitter<DtoOutputUpdatePost>();
  page: number = 1;
  count: number = 0;
  listSize: number = 5;
  listSizes: any = [5, 10, 15, 20, 50];

  element = false;

  form : FormGroup = this._fb.group({
    newComment : new FormControl('')
  });
  postFilter: any;

  constructor(private _postService: PostsService, private _fb : FormBuilder,
              private _toastr: ToastrService, public _signInService: SignInService) { }

  ngOnInit(): void {

  }

  onListDataChange(event: any) {
    this.page = event;
  }

  onListSizeChange(event: any) {
    this.listSize = event.target.value;
    this.page = 1;
  }

  emitUpdate(post: DtoInputPost) {
    this.postUpdated.next({
      idPost : post.idPost,
      idAuthor : post.idAuthor,
      idCat : post.idCat,
      message : this.form.value.newComment,
      sujet : post.sujet,
      urlPost: post.urlPost,
      datePost: post.datePost,
      dateLastEdit: post.dateLastEdit
    });
    this.hideData();
    this._toastr.success("Le post a bien été modifié avec succès!");
  }

  emitDelete(post: DtoInputPost) {
    if(window.confirm('Êtes-vous sûr de vouloir supprimer ce post ?')) {
      this.postDeleted.next(post);
      this._toastr.success("Le post a bien été supprimé avec succès!");
    }
  }

  showData(post: DtoInputPost) {
    this.posts.forEach(i => i.isSelected = false);
    post.isSelected = true;
    return (this.element = true);
  }
  hideData() {
    this.posts.forEach(i => i.isSelected = false);
    return (this.element = false);
  }
}
