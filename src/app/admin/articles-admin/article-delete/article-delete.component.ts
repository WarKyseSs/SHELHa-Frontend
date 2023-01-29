import {Component, Input, OnInit, Output} from '@angular/core';
import {DtoInputArticle} from "../../../dtos/article/dto-input-article";
import {ArticlesService} from "../../../services/article/articles.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-article-delete',
  templateUrl: './article-delete.component.html',
  styleUrls: ['./article-delete.component.css']
})
export class ArticleDeleteComponent implements OnInit {

  @Input() articles: DtoInputArticle[] = [];

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

  @Output() articleDeleted: DtoInputArticle = {
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

  constructor(private _toastr:ToastrService, private _fb: FormBuilder,private _articleService: ArticlesService) { }

  ngOnInit(): void {
    this.fetchAllArticles();
  }

  emitDelete() {
    this.articleDeleted = {
      idArticle: this.form.value.idArticle,
      title: this.form.value.title,
      description: this.form.value.description,
      datePublication: new Date(),
      // à changer quand il y aura la connection
      idAuthor: -1,
      urlArticle: "",
      username: ""
    };

    if(this.articleDeleted.title == "" || this.articleDeleted.title == null){
      this.articleDeleted.title = this.articleSelected.title;
    }

    if(this.articleDeleted.description == "" || this.articleDeleted.description == null){
      this.articleDeleted.description = this.articleSelected.description;
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

    if(window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      this.delete(this.articleDeleted);
      this._toastr.success("L'article "+this.articleDeleted.title+" a bien été supprimé!");
    }
    this.fetchAllArticles();
    this.form.reset();
  }

  delete(dto: DtoInputArticle) {
    this._articleService.delete(dto.idArticle).subscribe(() =>{
      this.articles = this.articles.filter(article => article.idArticle !== dto.idArticle);
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
