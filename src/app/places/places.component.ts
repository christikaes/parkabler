import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { GeolocationService } from '../shared/geolocation.service';

@Component({
  selector: 'places-search',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, AfterViewInit {
  @ViewChild('placesInput') placesInput;
  autocomplete: any;

  constructor(
    private geolocation: GeolocationService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    let inputElement = this.placesInput.nativeElement;
    this.autocomplete = new window.google.maps.places.Autocomplete(inputElement);
    this.autocomplete.addListener('place_changed', () => {
      let place = this.autocomplete.getPlace();
      if (!place.geometry) {
        console.log('places api did not return geometry');
        return;
      }
      this.geolocation.mapLocation.set(place.geometry.location);
    });
  }
}
