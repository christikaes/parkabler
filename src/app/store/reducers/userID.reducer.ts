const uuidv1 = require('uuid/v1');

const INITIAL_STATE = uuidv1();

// Sets a userID if one does not exist (the first time the app is opened)
export function userIDReducer(
    state: string = INITIAL_STATE
) {
    return state;
}
