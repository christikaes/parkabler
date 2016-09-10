import { Component, OnInit } from '@angular/core';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core';

@Component({
  selector: 'edit-spot',
  templateUrl: './editspot.component.html',
  styleUrls: ['./editspot.component.scss'],
  providers: [MdUniqueSelectionDispatcher], // what's this?
})
export class EditSpotComponent implements OnInit {
  public enteringSpot: boolean;

  constructor() {
    this.enteringSpot = false;
  }

  ngOnInit() {}

  addSpot() {
    this.enteringSpot = true;
  }

  cancelAddSpot() {
    this.enteringSpot = false;
  }
}
