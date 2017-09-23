import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { Spot2 } from '~/util';

@Injectable()
export class AddSpotsService {
  constructor(
    private db: AngularFireDatabase
  ) { }

  // Pushes the given spot the database
  public addSpot(spot: Spot2) {
    this.db.list('addspots').push(spot);
  }

  // Edits the given spot in the datatabase
  public editSpot(spot: Spot2) {
    this.db.list('editspots').push(spot);
  }
}
