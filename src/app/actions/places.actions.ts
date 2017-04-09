import { Injectable } from '@angular/core';
import { IAppState } from '~/store';
import { NgRedux } from 'ng2-redux';
import { Place, PlaceCollection, AppModes } from '~/util';
import { DestinationActions } from '~/actions';
// TODO-rangle: Why is this causing a DI issue when I get it from the barrel?
import { MapActions } from '~/actions/map.actions';

@Injectable()
export class PlacesActions {
    static SET = 'PA/PLACES/SET';

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private destinationActions: DestinationActions,
        private mapActions: MapActions
    ) {}

    public setPlace(place: Place) {
        this.ngRedux.dispatch({
            type: PlacesActions.SET,
            payload: place
        });

        if (this.ngRedux.getState().appMode !== AppModes.AddSpot) {
            // If not in add spot mode set destination
            this.destinationActions.setDestination(place.geometry.coordinates);
        } else {
            // Otherwise, just center the map
            this.mapActions.setCenter(place.geometry.coordinates);
        }
    }
}
