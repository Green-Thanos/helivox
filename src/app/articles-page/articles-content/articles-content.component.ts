import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/dta.service';

@Component({
  selector: 'articles-content',
  templateUrl: './articles-content.component.html',
  styleUrls: ['./articles-content.component.css'],
})
export class ArticlesContentComponent implements OnInit {
  testObj = [];

  selectedArticle = {};
  showSelectedArticle(selectedArticle: any) {
    this.selectedArticle = selectedArticle;
    this.showArticle = true;
  }

  ngOnInit(): void {
    this.dta.getData('Articles').subscribe((data) => {
      console.log(data);
    });
    setTimeout(() => {
      this.testObj = this.dta.getArticles();
    }, 200);
  }

  articlesButtons = ['Latest', 'Highschool', 'College', 'Archive'];

  selected = 'Latest';

  formatDate(dateString: string) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  }

  //  testObj = [
  //     {
  //       title: "test article",
  //       image: "https://venngage-wordpress.s3.amazonaws.com/uploads/2016/10/IconsHeader.png",
  //       author: "test author",
  //       date: new Date(),
  //       content: "https://raw.githubusercontent.com/LemonX19/Helivox-Public/main/6.png",
  //       category: "Highschool"
  //     },
  //     {
  //       title: "test article 2",
  //       image: "https://kezbrks.files.wordpress.com/2014/03/screen-shot-2014-03-10-at-15-37-33.png",
  //       author: "test author 2",
  //       date: new Date(),
  //       content: "",
  //       category: "College"
  //     },
  //     {
  //       title: "test article 3",
  //       image: "https://kezbrks.files.wordpress.com/2014/03/screen-shot-2014-03-10-at-15-37-33.png",
  //       author: "test author 3",
  //       date: new Date(),
  //       content: "",
  //       category: "Archive"
  //     }
  // ]

  showArticle = false;

  gotoTop() {
    window.scroll({
      top: 0,
      left: 0,
    });
  }

  constructor(
    private dta: DataService,
    private http: HttpClient,
  ) {}
}
