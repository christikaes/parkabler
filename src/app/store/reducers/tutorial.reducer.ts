import { TutorialActions } from '~/actions';
import { Tutorial, TutorialState, Action } from '~/util';

const INITIAL_STATE: TutorialState = {
    open: false,
    tutorial: 'intro'
};

export function tutorialReducer(
    state: TutorialState = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {

        case TutorialActions.OPEN:
            return Object.assign({}, state, {open: true});

        case TutorialActions.CLOSE:
            return Object.assign({}, state, {open: false});

        case TutorialActions.SET:
            return Object.assign({}, state, {tutorial: action.payload});

        default:
            return state;
    }
}
