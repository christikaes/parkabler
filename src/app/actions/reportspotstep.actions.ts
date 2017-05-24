import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '~/store';
import { ReportSpotSteps } from '~/util';


@Injectable()
export class ReportSpotStepActions {
    static SET_STEP_DETAILS = 'PA/REPORTSPOTSTEP/DETAILS';
    static SET_STEP_SUBMITTED = 'PA/REPORTSPOTSTEP/SUBMITTED';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {}

    public setStep(step: ReportSpotSteps) {
        switch (step) {
            case ReportSpotSteps.Details:
                this.setStepDetails();
                break;
            case ReportSpotSteps.Submitted:
                this.setStepSubmitted();
                break;
            default:
                throw new Error(('No step action found for: ' + step));
        }
    }

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
