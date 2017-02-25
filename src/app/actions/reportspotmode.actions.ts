import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';


@Injectable()
export class ReportSpotModeActions {
    static SET_MODE_OPEN = 'PA/ADDSPOTMODE/OPEN';
    static SET_MODE_CLOSED = 'PA/ADDSPOTMODE/CLOSED';
    static SET_MODE_SETDETAILS = 'PA/ADDSPOTMODE/SETDETAILS';
    static SET_MODE_SUBMITTED = 'PA/ADDSPOTMODE/SUBMITTED';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {}

    public setModeOpen() {
        this.ngRedux.dispatch({
            type: ReportSpotModeActions.SET_MODE_OPEN
        });
    }

    public setModeClosed() {
        this.ngRedux.dispatch({
            type: ReportSpotModeActions.SET_MODE_CLOSED
        });
    }

    public setModeSetdetails() {
        this.ngRedux.dispatch({
            type: ReportSpotModeActions.SET_MODE_SETDETAILS
        });
    }

    public setModeSubmitted() {
        this.ngRedux.dispatch({
            type: ReportSpotModeActions.SET_MODE_SUBMITTED
        });
    }
}
