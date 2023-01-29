import {Component, Input, OnInit} from '@angular/core';
import {DtoInputArticle} from "../../../dtos/article/dto-input-article";

@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.css']
})
export class ArticleListComponent implements OnInit {

  @Input() articles: DtoInputArticle[] = [];
  page: number = 1;
  count: number = 0;
  listSize: number = 5;
  listSizes: any = [5, 10, 15, 20, 50];

  constructor() { }

  ngOnInit(): void {
  }

  onListDataChange(event: any) {
    this.page = event;
  }

  onListSizeChange(event: any) {
    this.listSize = event.target.value;
    this.page = 1;
  }
}
