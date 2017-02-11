import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pa-drawer',
  templateUrl: './drawer.component.html',
  styleUrls: ['./drawer.component.scss']
})
export class DrawerComponent {
  @Input() expanded: boolean;
}
