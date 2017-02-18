import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pa-text-view',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.scss']
})
export class TextComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello TextView');
  }

}
