import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '~/store';
import { Spot2 } from '~/util';

@Injectable()
export class SpotActions {
    static SET_FOCUS = 'PA/SPOTS/SET/FOCUS';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {
    }

    public setFocusedSpot(spot: string) {
        this.ngRedux.dispatch({
            type: SpotActions.SET_FOCUS,
            payload: spot
        });
    }
}
