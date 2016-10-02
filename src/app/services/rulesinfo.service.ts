import { Injectable } from '@angular/core';
// import { AngularFire, FirebaseListObservable } from 'angularfire2';

// If the user is offline, use this data:
const info = require('./data/rulesinfo.json');

@Injectable()
export class RulesInfoService {
  rules: any[];

  constructor() {
    this.rules = info.Boston;
  }
}
