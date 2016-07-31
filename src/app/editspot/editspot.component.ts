import { Component, OnInit } from '@angular/core';
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
  providers: [MdUniqueSelectionDispatcher],
  directives: [ MdCard, MdCheckbox, MdButton, MdRadioGroup, MdRadioButton, MdInput ]
})
export class EditSpotComponent implements OnInit {

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    console.log('Hello EditSpot');
  }

}
