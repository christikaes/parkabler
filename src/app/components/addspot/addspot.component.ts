import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AppModes } from '~/util';
import Animations from '~/animations';


@Component({
  selector: 'pa-add-spot',
  templateUrl: './addspot.component.html',
  styleUrls: ['./addspot.component.scss'],
  animations: Animations
})

export class AddSpotComponent {
  @Input() public opened: boolean;

  @Output() private open = new EventEmitter();
  @Output() private close = new EventEmitter();

  onClose() {
    this.close.emit();
  }

  onOpen() {
    this.open.emit();
  }
}
