import { Injectable } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';

// If the user is offline, use this data:
// const info = require('./rulesinfo.json');

@Injectable()
export class RulesInfoService {
  rules: FirebaseListObservable<any[]>;

  constructor(af: AngularFire) {
     this.rules = af.database.list('rulesinfo');
  }
}
