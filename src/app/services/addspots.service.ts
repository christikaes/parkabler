import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Spot2 } from '~/util';

@Injectable()
export class AddSpotsService {
  constructor(
    private db: AngularFireDatabase
  ) { }

  // Pushes the given spot the the database
  public addSpot(spot: Spot2) {
    this.db.list('addspots').push(spot);
  }
}
