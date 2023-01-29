import {Component, OnInit} from '@angular/core';
import {DtoInputArticle} from "../../dtos/article/dto-input-article";
import {ArticlesService} from "../../services/article/articles.service";

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  articles: DtoInputArticle[] = [];

  constructor(private _articleService: ArticlesService) {
  }

  ngOnInit(): void {
    this.fetchAllArticles();
  }

  fetchAllArticles(){
    this._articleService.fetchAll().subscribe(articles => this.articles = articles);
  }

  delete(dto: DtoInputArticle) {
    this._articleService.delete(dto.idArticle).subscribe(() =>{
      this.articles = this.articles.filter(article => article.idArticle !== dto.idArticle);
    });
  }
}
