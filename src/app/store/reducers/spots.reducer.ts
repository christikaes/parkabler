import { SpotsActions } from '~/actions';
import { Action } from '~/util';

export type Spots = Array<Spot>;

export interface Spot extends GeoJSON.Feature<GeoJSON.Point> {
    id: string;
    properties: {
        addedBy: string;
        verified: boolean;
        quantity: number;
        cost?: string;
        commercial?: boolean;
        description?: string;
        active?: boolean;
        nearby?: boolean;
        distanceToDestination?: number;
    };
}

export interface SpotsState {
    compiled: Spots;
    database: Spots;
    user: Spots;
    nearby: Spots;
    active: Spot;
}

const INITIAL_STATE: SpotsState = {
    compiled: [],
    database: [],
    user: [],
    nearby: [],
    active: null
};

export function spotsReducer(
    state: SpotsState = INITIAL_STATE,
    action: Action
) {
    switch (action.type) {

        // The Database spots were set
        case SpotsActions.SET_DATABASE_SPOTS: {
            const database = action.payload;
            // 1. remove any user added spots that match the ids of the db
            let user = [...state.user];
            database.forEach(ds => user = user.filter(us => us.id !== ds.id));
            // 2. recompileAll
            const compiled = compileAll(database, user, state.nearby, state.active);

            return { ...state, database, user, compiled };
        }

        // A User spot was updated
        case SpotsActions.UPDATE_USER_SPOT: {
            const newSpot = action.payload;
            let user = [...state.user];
            if (!state.user.map(s => s.id).includes(newSpot.id)) {
                //  1. ADD If the newSpot is not in user
                user = [...user, newSpot];
            } else {
                // 2. SET If it is in user
                user = user.map(spot => spot.id === newSpot.id ? newSpot : spot);
            }

            // 3. recompileAll
            const compiled = compileAll(state.database, user, state.nearby, state.active);

            return { ...state, user, compiled };
        }

        // The nearby spots were set
        case SpotsActions.SET_NEARBY_SPOTS: {
            //  1. Set the nearby spots
            const nearby = action.payload;
            //  2. Recompile just nearby (since nothing else should change)
            const compiled = compileNearby(state.compiled, action.payload);

            return { ...state, nearby, compiled };
        }

        // The active spotId was set
        case SpotsActions.SET_ACTIVE_SPOT: {
            // 1. Set the active spot
            const active = action.payload;
            // 2. Recompile just activeId (since nothing else should change)
            const compiled = compileActiveSpot(state.compiled, active);

            return { ...state, active, compiled };
        }

        default:
            return state;
    }
}

// Sets the `active` prop on each spot based on the active spot
const compileActiveSpot = (compiled: Spots, active: Spot) => {
    return compiled.map(spot => {
        // Set the active prop
        const properties = { ...spot.properties, active: active ? spot.id === active.id : false };
        return { ...spot, properties };
    });
};

// Sets the `nearby` props on each spot based on the nearbySpots
const compileNearby = (compiled: Spots, nearby: Spots) => {
    return compiled.map(spot => {
        const nearbySpot = nearby.find(ns => ns.id === spot.id);
        // If it is nearby, then use the nearbySpot props, set the nearby prop
        const properties = nearbySpot
            ? { ...spot.properties, ...nearbySpot.properties, nearby: true }
            : { ...spot.properties, nearby: false };
        return { ...spot, properties };
    });
};

// Recompiled based on all of the data
const compileAll = (database: Spots, user: Spots, nearby: Spots, active: Spot) => {
    // Remove spots fromdb that are in user
    let compiled = database.filter(ds => !user.map(us => us.id).includes(ds.id));
    // Remove spots in user that are 0, and add to db
    compiled = [...compiled, ...user.filter(s => s.properties.quantity > 0)];
    compiled = compileNearby(compiled, nearby);
    compiled = compileActiveSpot(compiled, active);

    return compiled;
};
