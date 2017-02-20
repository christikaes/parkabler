import { Component, OnInit , ViewChild, Output, EventEmitter } from '@angular/core';
import { Position, Place } from '~/util';
import { FormControl } from '@angular/forms';
import { PlacesService } from '~/services';
import 'rxjs/add/operator/startWith';
import { MdAutocompleteTrigger } from '@angular/material';
import { Observable } from 'rxjs';

@Component({
  selector: 'pa-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.scss']
})
export class PlacesComponent implements OnInit {
  public placesControl: FormControl;
  public matchingPlaceCollection;

  // @ViewChild(MdAutocompleteTrigger) trigger: MdAutocompleteTrigger;
  autocomplete: any;

  @Output() destinationUpdate = new EventEmitter();

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

    // // optionSelections is an array of observables
    // // https://github.com/angular/material2/issues/3205
    // this.trigger.optionSelections[0].subscribe((option) => {
    //   console.log(option);
    //   // destinationUpdate
    // });
  }
}
