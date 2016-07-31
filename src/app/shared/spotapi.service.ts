import { Injectable } from '@angular/core';
const Data = require('./data.json');

@Injectable()
export class SpotApiService {
  data = Data
}
