import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs/Observable';
import { Spot } from '~/util';

@Injectable()
export class AddSpotsService {
  constructor(
    private af: AngularFire
  ) {}

  // Pushes the given spot the the database
  public addSpot (spot: Spot) {
    this.af.database.list('addspots').push(spot);
  }
}
