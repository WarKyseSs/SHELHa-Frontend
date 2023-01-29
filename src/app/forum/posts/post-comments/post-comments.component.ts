import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DtoInputPost} from "../../../dtos/post/dto-input-posts";
import {DtoInputComment} from "../../../dtos/comment/dto-input-comment";
import {PostsService} from "../posts.service";

@Component({
  selector: 'app-post-comments',
  templateUrl: './post-comments.component.html',
  styleUrls: ['./post-comments.component.css']
})
export class PostCommentsComponent implements OnInit {
  post: DtoInputPost | null = null;
  @Input() comments : DtoInputComment[] = [];
  constructor(private _route: ActivatedRoute, private _postService: PostsService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {
      if (args.has("urlPost")) {
        const urlPost = String(args.get("urlPost"));
        this.fetchPostByUrl(urlPost);
        this.fetchCommentsByUrl(urlPost);
      }
    });
  }

  private fetchPostByUrl(urlPost: string) {
    this._postService
      .fetchPostByUrl(urlPost)
      .subscribe(post => this.post = post);
  }

  fetchCommentsByUrl(urlTopic : string){
    this._postService
      .fetchCommentsByUrl(urlTopic)
      .subscribe(comments => this.comments = comments);
  }
}
