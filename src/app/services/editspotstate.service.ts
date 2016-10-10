import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export enum States {
  Closed,
  AddLocation,
  AddDetails,
  ReportDetails,
  Submitted
};

@Injectable()
export class EditSpotStateService {
  private _state: Subject<States> = new Subject<States>();
  public state: Observable<States> = this._state.asObservable();

  constructor() {
  }

  set(s: States): void {
    this._state.next(s);
  }
}
