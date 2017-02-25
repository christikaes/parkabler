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

    public setModeToHome() {
        console.log(AppModeActions.SET_MODE_HOME);
        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_HOME
        });
    }

    public setModeToAddSpot() {
        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_ADDSPOT
        });
    }
}
