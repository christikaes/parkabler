import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'pa-add-spot-button',
  templateUrl: './addspot-button.component.html',
  styleUrls: ['./addspot-button.component.scss']
})

export class AddSpotButtonComponent {
  @Output() private open = new EventEmitter();

  onOpen() {
    this.open.emit();
  }
}
