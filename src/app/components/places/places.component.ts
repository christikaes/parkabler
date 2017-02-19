import { Component, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Position } from '~/util';

@Component({
  selector: 'pa-places-search',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements AfterViewInit {
  @ViewChild('placesInput') placesInput;
  autocomplete: any;

  @Output() destinationUpdate = new EventEmitter();

  constructor() {}

  ngAfterViewInit() {
    let inputElement = this.placesInput.nativeElement;
    this.autocomplete = new window.google.maps.places.Autocomplete(inputElement);
    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace();
      if (!place.geometry) {
        console.log('places api did not return geometry');
        return;
      }

      this.destinationUpdate.emit({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    });
  }
}
