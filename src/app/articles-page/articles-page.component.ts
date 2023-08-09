import { Component } from '@angular/core';

@Component({
  selector: 'articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.css']
})
export class ArticlesPageComponent {
  articlesButtons = ["Latest", "Highschool", "College", "Archive"];

  selected = "Latest";

  testObj = [
    {
    title: "test article",
    image: "https://kezbrks.files.wordpress.com/2014/03/screen-shot-2014-03-10-at-15-37-33.png",
    author: "john smith",
    date: new Date()
  }]
}
