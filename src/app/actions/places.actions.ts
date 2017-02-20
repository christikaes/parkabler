import { Injectable } from '@angular/core';
import { IAppState } from '~/store';
import { NgRedux } from 'ng2-redux';
import { Place, PlaceCollection } from '~/util';
import { DestinationActions } from '~/actions';

@Injectable()
export class PlacesActions {
    static SET = 'PA/PLACES/SET';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private destinationActions: DestinationActions
    ) {}

    /*
    What I'm confused about with redux is situations where two things might edit the state. For eg:

    When the user enters a value into places.component, it will set the state.place
    But a different x.component (eg centerOnMe) might need to update state.place
    If that happens, it'll go into a loop:
        x.component sets state.place
        places.component listens to the change on state.place
        places.component updates and sets state.place
        ^
    */

    public setPlace(place: Place) {
        this.ngRedux.dispatch({
            type: PlacesActions.SET,
            payload: place
        });

        // If not in add spot mode:
        // Set destination
        this.destinationActions.setDestination({
            lat: place.geometry.coordinates[1],
            lng: place.geometry.coordinates[0]
        });

        // else
        // Center map

    }
}
