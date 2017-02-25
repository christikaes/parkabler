import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';


@Injectable()
export class AddSpotModeActions {
    static SET_MODE_OPEN = 'PA/ADDSPOTMODE/OPEN';
    static SET_MODE_CLOSED = 'PA/ADDSPOTMODE/CLOSED';
    static SET_MODE_SETLOCATION = 'PA/ADDSPOTMODE/SETLOCATION';
    static SET_MODE_SETDETAILS = 'PA/ADDSPOTMODE/SETDETAILS';
    static SET_MODE_SUBMITTED = 'PA/ADDSPOTMODE/SUBMITTED';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {}

    public setModeOpen() {
        this.ngRedux.dispatch({
            type: AddSpotModeActions.SET_MODE_OPEN
        });
    }

    public setModeClosed() {
        this.ngRedux.dispatch({
            type: AddSpotModeActions.SET_MODE_CLOSED
        });
    }

    public setModeSetlocation() {
        this.ngRedux.dispatch({
            type: AddSpotModeActions.SET_MODE_SETLOCATION
        });
    }

    public setModeSetdetails() {
        this.ngRedux.dispatch({
            type: AddSpotModeActions.SET_MODE_SETDETAILS
        });
    }

    public setModeSubmitted() {
        this.ngRedux.dispatch({
            type: AddSpotModeActions.SET_MODE_SUBMITTED
        });
    }
}
