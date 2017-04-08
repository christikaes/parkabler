import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';
import { AddSpotSteps } from '~/util';


@Injectable()
export class AddSpotInfoActions {
    static SET_INFO = 'PA/ADDSPOTSTEP/SET_INFO';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {}

    public setInfo(info: any) {
        this.ngRedux.dispatch({
            type: AddSpotInfoActions.SET_INFO,
            payload: info
        });
    }

    public setLocation() {
        let coordinates = this.ngRedux.getState().map.center;
        this.setInfo({
            coordinates: coordinates
        });
    }
}
