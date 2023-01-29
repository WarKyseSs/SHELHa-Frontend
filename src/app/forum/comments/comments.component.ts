import {Component, Input, OnInit} from '@angular/core';
import {DtoOutputCreateComment} from "../../dtos/comment/dto-output-create-comment";
import {CommentsService} from "./comments.service";
import {DtoInputComment} from "../../dtos/comment/dto-input-comment";
import {ActivatedRoute} from "@angular/router";
import {PostsService} from "../posts/posts.service";
import {DtoInputPost} from "../../dtos/post/dto-input-posts";
import {DtoOutputUpdateComment} from "../../dtos/comment/dto-output-update-comment";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  comments: DtoInputComment[] = [];
  @Input() postComment: DtoInputPost | null = null;

  urlPost: string = "";

  constructor(private _commentService: CommentsService,
              private _route: ActivatedRoute,
              private _postService: PostsService
  ) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {
      if (args.has("urlPost")) {
        this.urlPost = String(args.get("urlPost"));
        this.fetchCommentsByUrl(this.urlPost);
      }
    });
  }

  fetchCommentsByUrl(urlTopic : string){
    this._postService
      .fetchCommentsByUrl(urlTopic)
      .subscribe(comments => this.comments = comments);
  }

  create(dto: DtoOutputCreateComment) {
    this._commentService.create(dto).subscribe(comment => this.comments.push(comment));
  }

  update(dto: DtoOutputUpdateComment) {
    this._commentService.updateComment(dto).subscribe();
    this.fetchCommentsByUrl(this.urlPost);
  }

  delete(dto: DtoInputComment) {
    this._commentService.delete(dto.idComment).subscribe(() => {
      this.comments = this.comments.filter(comment => comment.idComment !== dto.idComment);
    })
  }

}
