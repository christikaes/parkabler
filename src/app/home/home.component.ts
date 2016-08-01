import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map';
import { EditSpotComponent } from '../editspot';
import { PlacesComponent } from '../places';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [ MapComponent, EditSpotComponent, PlacesComponent ]
})
export class HomeComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {}

}
