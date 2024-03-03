import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'articles-input',
  templateUrl: './articles-input.component.html',
  styleUrls: ['./articles-input.component.css'],
})
export class ArticlesInputComponent {
  Article = {
    title: '',
    image: '',
    author: '',
    date: new Date(),
    content: '',
    category: '',
  };
  title = '';
  image = '';
  author = '';
  content = '';
  category = '';
  confirmationModal = false;

  submit() {
    this.confirmationModal = true;
  }
  resetInputValues() {
    this.title = '';
    this.image = '';
    this.author = '';
    this.content = '';
    this.category = '';
  }

  checkConfirmation(confirmation: boolean) {
    if (confirmation) {
      this.Article.title = this.title;
      this.Article.image = this.image;
      this.Article.author = this.author;
      this.Article.content = this.content;
      this.Article.category = this.category;

      this.submitToDatabase(this.Article);
      this.resetInputValues();
    }
    this.confirmationModal = false;
  }

  submitToDatabase(Article: any) {
    this.dta.patchData(
      {
        Article: Article,
      },
      'Admin',
    );
    this.dta.addArticle(Article);
    this.dta.setArticles();
  }
  trackByFn(index: any, item: any) {
    return index;
  }
  constructor(private dta: DataService) {}
}
