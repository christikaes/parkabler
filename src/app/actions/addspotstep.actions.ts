import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';


@Injectable()
export class AddSpotStepActions {
    static SET_STEP_LOCATION = 'PA/ADDSPOTMODE/LOCATION';
    static SET_STEP_DETAILS = 'PA/ADDSPOTMODE/DETAILS';
    static SET_STEP_SUBMITTED = 'PA/ADDSPOTMODE/SUBMITTED';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {}

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
