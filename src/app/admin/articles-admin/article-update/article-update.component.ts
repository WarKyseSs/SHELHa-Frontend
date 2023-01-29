import {Component, OnInit, Output} from '@angular/core';
import {DtoInputArticle} from "../../../dtos/article/dto-input-article";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticlesService} from "../../../services/article/articles.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-article-update',
  templateUrl: './article-update.component.html',
  styleUrls: ['./article-update.component.css']
})
export class ArticleUpdateComponent implements OnInit {

  articles: DtoInputArticle[] = [];

  selected :number = 0;

  articleSelected: DtoInputArticle = {
    idArticle: -1,
    title: "",
    description: "",
    datePublication: new Date(),
    urlArticle: "",
    idAuthor: -1,
    username: ""
  };

  @Output() articleUpdated: DtoInputArticle = {
    idArticle: -1,
    title: "",
    description: "",
    datePublication: new Date(),
    urlArticle: "",
    idAuthor: -1,
    username: ""
  };

  form: FormGroup = this._fb.group({
    idArticle: [-1, Validators.required],
    title: [""],
    description: [""],
    idAuthor: [-1, Validators.required]
  });

  constructor(private _toastr: ToastrService, private _fb: FormBuilder, private _articleService: ArticlesService) { }

  ngOnInit(): void {
    this.fetchAllArticles();
  }

  emitUpdateArticle(){
    this.articleUpdated = {
      idArticle: this.form.value.idArticle,
      title: this.form.value.title,
      description: this.form.value.description,
      datePublication: new Date(),
      // à changer quand il y aura la connection
      idAuthor: -1,
      urlArticle: "",
      username: ""
    };

    if(this.articleUpdated.title == "" || this.articleUpdated.title == null){
      this.articleUpdated.title = this.articleSelected.title;
    }

    if(this.articleUpdated.description == "" || this.articleUpdated.description == null){
      this.articleUpdated.description = this.articleSelected.description;
    }

    this.articleSelected = {
      idArticle: -1,
      title: "",
      description: "",
      datePublication: new Date(),
      urlArticle: "",
      idAuthor: -1,
      username: ""
    };

    this.updateArticle(this.articleUpdated);
    this.fetchAllArticles();
    this.form.reset();
    this._toastr.success("L'article "+this.articleUpdated.title+" a bien été modifié!");
  }

  updateArticle(dto: DtoInputArticle) {
    this._articleService.update(dto).subscribe(() => {
        let article = this.articles.filter(article => article.idArticle == dto.idArticle)[0];
        let index = this.articles.indexOf(article);
        this.articles.splice(index, 1, dto);
    });
  }

  fetchAllArticles(){
    this._articleService.fetchAll().subscribe(articles => this.articles = articles);
  }

  SelectHandler(idArticle: number) {
    for(let article of this.articles){
      if(article.idArticle == idArticle){
        this.articleSelected = {
          idArticle: article.idArticle,
          title: article.title,
          description: article.description,
          datePublication: article.datePublication,
          urlArticle: article.urlArticle,
          idAuthor: article.idAuthor,
          username: ""
        }
      }
    }
  }
}
