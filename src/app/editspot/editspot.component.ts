import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { MdUniqueSelectionDispatcher } from '@angular2-material/core';
import { MdCard } from '@angular2-material/card';
import { MdButton } from '@angular2-material/button';
import { MdCheckbox } from '@angular2-material/checkbox';
import { MdRadioButton, MdRadioGroup } from '@angular2-material/radio';
import { MdInput } from '@angular2-material/input';

@Component({
  selector: 'edit-spot',
  templateUrl: './editspot.component.html',
  styleUrls: ['./editspot.component.scss'],
  providers: [MdUniqueSelectionDispatcher], // what's this?
  directives: [ NgClass, MdCard, MdCheckbox, MdButton, MdRadioGroup, MdRadioButton, MdInput ]
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
