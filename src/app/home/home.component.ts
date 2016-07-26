import { Component, OnInit } from '@angular/core';
import { MapComponent } from '../map';
import { HeaderComponent } from '../header';
import { EditSpotComponent } from '../editspot';
import { PlacesComponent } from '../places';

@Component({
  selector: 'my-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [ MapComponent, HeaderComponent, EditSpotComponent, PlacesComponent ]
})
export class HomeComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Home');
  }

}
