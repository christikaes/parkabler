import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import Animations from '~/animations';

@Component({
  selector: 'pa-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss'],
  animations: Animations
})
export class DrawerComponent implements OnInit, OnChanges {
  public state;
  @Input() private open: boolean;

  ngOnInit() {
    this.state = 'closed';
  }

  ngOnChanges(changes: SimpleChanges) {
    for (let change in changes) {
      if (change === 'open') {
        let isOpen = changes[change].currentValue;
        this.state = isOpen ? 'open' : 'closed';
      } else {
        throw 'Uncaught change: ' + change;
      }
    }
  }
}
