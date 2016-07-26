import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Map');
  }

}
