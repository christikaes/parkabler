import { Injectable } from '@angular/core';
const data = require('./data.json');

@Injectable()
export class SpotApiService {
  spots = data.spots;
}
