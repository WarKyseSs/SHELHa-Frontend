import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ArticlesService} from "../../../../services/article/articles.service";
import {DtoInputArticle} from "../../../../dtos/article/dto-input-article";

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  article: DtoInputArticle | null = null;

  constructor(private _route: ActivatedRoute, private _articleService: ArticlesService) { }

  ngOnInit(): void {
    this._route.paramMap.subscribe(args => {
      if (args.has("urlArticle")) {
        const urlArticle = String(args.get("urlArticle"));
        this.fetchArticleByUrl(urlArticle);
      }
    });
  }

  private fetchArticleByUrl(urlArticle: string) {
    this._articleService
      .fetchArticleByUrl(urlArticle)
      .subscribe(article => this.article = article);
  }
}
