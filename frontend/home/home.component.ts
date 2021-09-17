import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  elements: any = [
    {gram: 1, today: '4,650', yesterday: '4,643', change: '7'},
    {gram: 8, today: '37,200', yesterday: '37,144', change: '56'},
    {gram: 10, today: '46,500', yesterday: '46,430', change: '70'},
    {gram: 100, today: '4,65,000', yesterday: '4,64,300', change: '700'},
  ];

  heads: any =[
    'gram', 'today', 'yesterday', 'change'
  ];
  scroll(el: HTMLElement) {
    el.scrollIntoView({behavior: 'smooth'});
}
  constructor() { }

  ngOnInit(): void {
  }

}
