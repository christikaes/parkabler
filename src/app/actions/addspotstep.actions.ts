import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '~/store';
import { AddSpotSteps } from '~/util';


@Injectable()
export class AddSpotStepActions {
    static SET_STEP_LOCATION = 'PA/ADDSPOTSTEP/LOCATION';
    static SET_STEP_DETAILS = 'PA/ADDSPOTSTEP/DETAILS';
    static SET_STEP_SUBMITTED = 'PA/ADDSPOTSTEP/SUBMITTED';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {}

    public setStep(step: AddSpotSteps) {
        switch (step) {
            case AddSpotSteps.Location:
                this.setStepLocation();
                break;
            case AddSpotSteps.Details:
                this.setStepDetails();
                break;
            case AddSpotSteps.Submitted:
                this.setStepSubmitted();
                break;
            default:
                throw new Error(('No step action found for: ' + step));
        }
    }

    public setStepLocation() {
        this.ngRedux.dispatch({
            type: AddSpotStepActions.SET_STEP_LOCATION
        });
    }

    public setStepDetails() {
        this.ngRedux.dispatch({
            type: AddSpotStepActions.SET_STEP_DETAILS
        });
    }

    public setStepSubmitted() {
        this.ngRedux.dispatch({
            type: AddSpotStepActions.SET_STEP_SUBMITTED
        });
    }
}
