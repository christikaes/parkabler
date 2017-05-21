import { Component, OnInit , ViewChild, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Place } from '~/util';
import { FormControl } from '@angular/forms';
import { PlacesService } from '~/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'pa-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit, OnChanges {
  public placesControl: FormControl;
  public matchingPlaceCollection;

  @Input() private placeValue: string;

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

  ngOnChanges(changes: SimpleChanges) {
    for (let change in changes) {
      if (change === 'placeValue') {
        this.placesControl.setValue(changes[change].currentValue);
      } else {
        throw 'Uncaught change: ' + change;
      }
    }
  }

  selectOption(option) {
    this.placeUpdate.emit(option);
  }

  clearInput() {
    this.placesControl.setValue('');
    this.placeUpdate.emit(null);
  }
}
