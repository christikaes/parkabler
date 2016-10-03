import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MapLocationService, Position, GeolocationService, DestinationLocationService } from '../services';

@Component({
  selector: 'places-search',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, AfterViewInit {
  @ViewChild('placesInput') placesInput;
  autocomplete: any;

  constructor(
    private mapLocation: MapLocationService,
    private geoLocation: GeolocationService,
    private destinationLocation: DestinationLocationService
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
      this.mapLocation.set(place.geometry.location);
      this.mapLocation.setZoom(20);
      this.destinationLocation.set({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    });
  }

  recenter() {
    this.geoLocation.currentLocation()
      .then((p: Position) => {
        this.mapLocation.set(p);
        this.destinationLocation.set(p);
        this.mapLocation.setZoom(18);
      })
      .catch(() => {
        console.log('Current Location Not found');
      });
  }
}
