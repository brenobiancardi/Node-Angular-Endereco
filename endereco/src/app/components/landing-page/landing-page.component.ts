import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
})
export class LandingPageComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  fade(): void {
    const pageLanding = document.getElementById('page-without-background');
    if (pageLanding[0]) {
      pageLanding[0].className.add('.animation-fade');
    }
  }
}
