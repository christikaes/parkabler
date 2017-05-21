import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';


@Injectable()
export class AppModeActions {
    static SET_MODE_HOME = 'PA/MODE/HOME';
    static SET_MODE_ADDSPOT = 'PA/MODE/ADDSPOT';
    static SET_MODE_SPOTSLIST = 'PA/MODE/SPOTSLIST';
    static SET_MODE_REPORTSPOT = 'PA/MODE/REPORTSPOT';
    static SET_MODE_PREVIOUS = 'PA/MODE/PREVIOUS';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {}


    public setModeHome() {
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
        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_PREVIOUS
        });
    }

    public setModeSpotsList() {
        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_SPOTSLIST
        });
    }

    public setModeReportSpot() {
        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_REPORTSPOT
        });
    }
}
