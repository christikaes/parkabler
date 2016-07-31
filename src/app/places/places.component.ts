import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';

declare var google: any;

@Component({
  selector: 'places-search',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, AfterViewInit {
  @ViewChild('placesInput') placesInput;
  autocomplete: any;

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello Places');
  }

  ngAfterViewInit() {
    let inputElement = this.placesInput.nativeElement;
    this.autocomplete = new google.maps.places.Autocomplete(inputElement);
  }

}
