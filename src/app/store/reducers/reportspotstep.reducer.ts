import { ReportSpotStepActions } from '~/actions';
import { ReportSpotSteps, Action } from '~/util';

const INITIAL_STATE: ReportSpotSteps = 0;

export function reportSpotStepReducer(
    state: ReportSpotSteps = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case ReportSpotStepActions.SET_STEP_DETAILS:
            return ReportSpotSteps.Details;

        case ReportSpotStepActions.SET_STEP_SUBMITTED:
            return ReportSpotSteps.Submitted;

        default:
            return state;
    }
}
