import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';


@Injectable()
export class AppModeActions {
    static SET_MODE_HOME= 'PA/MODE/HOME';
    static SET_MODE_ADDSPOT= 'PA/MODE/ADDSPOT';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {}

    public setModeHome() {
        console.log(AppModeActions.SET_MODE_HOME);
        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_HOME
        });
    }

    public setModeAddSpot() {
        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_ADDSPOT
        });
    }

    public unsetModeAddSpot() {
        // TODO: Set mode to the previous mode
        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_HOME
        });
    }
}
