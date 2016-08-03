import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MdIcon, MdIconRegistry } from '@angular2-material/icon';
import { MdButton } from '@angular2-material/button';
import { MapLocationService } from '../services';

@Component({
  selector: 'places-search',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss'],
  directives: [MdIcon, MdButton],
  viewProviders: [MdIconRegistry]
})
export class PlacesComponent implements OnInit, AfterViewInit {
  @ViewChild('placesInput') placesInput;
  autocomplete: any;

  constructor(
    private mapLocation: MapLocationService
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
    });
  }
}
