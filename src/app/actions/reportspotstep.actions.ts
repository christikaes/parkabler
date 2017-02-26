import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';


@Injectable()
export class ReportSpotStepActions {
    static SET_STEP_DETAILS = 'PA/REPORTSPOTSTEP/DETAILS';
    static SET_STEP_SUBMITTED = 'PA/REPORTSPOTSTEP/SUBMITTED';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {}

    public setStepDetails() {
        this.ngRedux.dispatch({
            type: ReportSpotStepActions.SET_STEP_DETAILS
        });
    }

    public setStepSubmitted() {
        this.ngRedux.dispatch({
            type: ReportSpotStepActions.SET_STEP_SUBMITTED
        });
    }
}
