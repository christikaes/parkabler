import { AddSpotStepActions } from '~/actions';
import { AddSpotSteps, Action } from '~/util';

const INITIAL_STATE: AddSpotSteps = 0;

export function addSpotStepReducer(
    state: AddSpotSteps = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {
        case AddSpotStepActions.SET_STEP_LOCATION:
            return AddSpotSteps.Location;

        case AddSpotStepActions.SET_STEP_DETAILS:
            return AddSpotSteps.Details;

        case AddSpotStepActions.SET_STEP_SUBMITTED:
            return AddSpotSteps.Submitted;

        default:
            return state;
    }
}
