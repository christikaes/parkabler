import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'spots-list',
  templateUrl: './spotslist.component.html',
  styleUrls: ['./spotslist.component.scss']
})
export class SpotsListComponent implements OnInit {
  private expanded: boolean;
  private numSpot: number;
  private spots: string[];

  constructor() {
    this.expanded = false;
    this.numSpot = 100;
    this.spots = ["a", "b", "c", "d"];
  }

  ngOnInit() {}

  toggleExapand() {
    this.expanded = !this.expanded;
  }
}
