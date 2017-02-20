import { Component, OnInit , ViewChild, Output, EventEmitter } from '@angular/core';
import { Position, Place } from '~/util';
import { FormControl } from '@angular/forms';
import { PlacesService } from '~/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'pa-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  public placesControl: FormControl;
  public matchingPlaceCollection;

  @Output() placeUpdate = new EventEmitter();

  constructor(
    private placesService: PlacesService
  ) {
    this.placesControl = new FormControl();
  }

  ngOnInit() {
    this.placesControl.valueChanges
      .subscribe((val) => {
        this.matchingPlaceCollection = this.placesService.getAutocomplete(val);
      });
  }

  selectOption(option) {
    this.placeUpdate.emit(option);
  }
}
