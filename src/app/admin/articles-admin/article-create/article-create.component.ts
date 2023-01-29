import {Component, OnInit, Output} from '@angular/core';
import {DtoOutputCreateArticle} from "../../../dtos/article/dto-output-create-article";
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ArticlesService} from "../../../services/article/articles.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-article-create',
  templateUrl: './article-create.component.html',
  styleUrls: ['./article-create.component.css']
})
export class ArticleCreateComponent implements OnInit {

  @Output() articleCreated: DtoOutputCreateArticle = {
    title: "",
    description:"",
    datePublication: new Date(),
    idAuthor: -1
  };

  form: FormGroup = this._fb.group({
    title: ["", Validators.required],
    description: ["", Validators.required]
  });

  constructor(private _toastr:ToastrService, private _fb: FormBuilder, private _articleService: ArticlesService) { }

  ngOnInit(): void {
  }

  emitArticle(){
    this.articleCreated = {
      title: this.form.value.title,
      description: this.form.value.description,
      datePublication: new Date(),
      idAuthor: -1
    };
    this.createArticle(this.articleCreated);
    this.form.reset();
    this._toastr.success("L'article "+this.articleCreated.title+" a bien été ajouté!");
  }

  createArticle(article: DtoOutputCreateArticle) {
    this._articleService.create(article).subscribe();
  }

  controls(name: string): AbstractControl | null {
    return this.form.get(name);
  }
}
