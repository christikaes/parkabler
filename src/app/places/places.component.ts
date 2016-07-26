import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'places-search',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Places');
  }

}
