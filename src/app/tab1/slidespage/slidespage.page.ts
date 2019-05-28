import { Component } from '@angular/core';

@Component({
  selector: 'app-slidespage',
  templateUrl: './slidespage.page.html',
  styleUrls: ['./slidespage.page.scss'],
})
export class SlidespagePage {

  constructor() { }

  slideOpts = {
    initialSlide: 1,
    speed: 400
  };
}
