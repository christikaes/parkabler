import { Injectable } from '@angular/core';
import { IAppState } from '~/store';
import { NgRedux } from '@angular-redux/store';
import { Place, PlaceCollection, AppModes } from '~/util';
// TODO-rangle: Why is this causing a DI issue when I get it from the barrel?
import { DestinationActions } from '~/actions/destination.actions';
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
            // If not in add spot mode set/clear destination
            if (place === null) {
                this.destinationActions.setDestination(null);
            } else {
                this.destinationActions.setDestination(place.geometry.coordinates);
            }
        } else {
            // Otherwise, just center the map
            this.mapActions.setCenter(place.geometry.coordinates);
        }
    }
}
