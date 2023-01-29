import {Component, Input, OnInit} from '@angular/core';
import {DtoInputPost} from "../../dtos/post/dto-input-posts";
import {PostsService} from "./posts.service";
import {ActivatedRoute} from "@angular/router";
import {DtoOutputCreatePost} from "../../dtos/post/dto-output-create-post";
import {TopicsService} from "../../services/topic/topics.service";
import {DtoOutputUpdatePost} from "../../dtos/post/dto-output-update-post";

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input() posts : DtoInputPost[] = [];
  urlTopic: string = "";
  constructor(
    private _postService: PostsService,
    private _route:ActivatedRoute,
    private _topicService:TopicsService
  ) { }


  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {
      if(args.has("urlTopic"))
      {
        this.urlTopic = String(args.get("urlTopic"));
        this.fetchPostsByUrl(this.urlTopic);
      }
    })
  }

  fetchPostsByUrl(urlTopic : string){
    this._topicService.fetchPostsByUrl(urlTopic).subscribe( posts => this.posts = posts);
  }

  create(dto: DtoOutputCreatePost) {
    this._postService.create(dto).subscribe(post => this.posts.push(post));
  }

  update(dto: DtoOutputUpdatePost) {
    this._postService.update(dto).subscribe();
    this.fetchPostsByUrl(this.urlTopic);
  }

  delete(dto: DtoInputPost) {
    this._postService.delete(dto.idPost).subscribe(() => {
      this.posts = this.posts.filter(post => post.idPost !== dto.idPost);
    })
  }
}
