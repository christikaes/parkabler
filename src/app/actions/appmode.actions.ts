import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '~/store';
import { AppModes } from '~/util';
import { MapActions } from '~/actions/map.actions';
import { PlacesActions } from '~/actions/places.actions';

@Injectable()
export class AppModeActions {
    static SET_MODE_HOME = 'PA/MODE/HOME';
    static SET_MODE_ADD = 'PA/MODE/ADD';
    static SET_MODE_EDIT = 'PA/MODE/EDIT';
    static SET_MODE_SEARCH = 'PA/MODE/SEARCH';
    static SET_MODE_NAVIGATE = 'PA/MODE/NAVIGATE';
    static SET_MODE_INFO = 'PA/MODE/INFO';
    static SET_MODE_PREVIOUS = 'PA/MODE/PREVIOUS';

    private previousZoom: number;

    constructor(
        private ngRedux: NgRedux<IAppState>,
        private mapActions: MapActions,
        private placesActions: PlacesActions
    ) {
        this.previousZoom = this.ngRedux.getState().map.zoom;
    }


    public setModeHome() {
        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_HOME
        });

        window['ga']('send', 'event', 'appmode', 'home', 'release-1');
    }

    public setModeAdd() {
        this.placesActions.setPlace(null);
        this.previousZoom = this.ngRedux.getState().map.zoom;
        this.mapActions.setZoom(18);

        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_ADD
        });

        window['ga']('send', 'event', 'appmode', 'add', 'release-1');
    }

    public unsetMode() {
        this.mapActions.setZoom(this.previousZoom);
        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_PREVIOUS
        });
    }

    public setModeEdit() {
        const activeSpot = this.ngRedux.getState().spots.active;
        if (activeSpot) {
            this.mapActions.setZoom(18);
            this.mapActions.setCenter(activeSpot.geometry.coordinates);
        }

        this.ngRedux.dispatch({
            type: AppModeActions.SET_MODE_EDIT
        });

        window['ga']('send', 'event', 'appmode', 'edit', 'release-1');
    }

    public setModeSpotsList() {
        // Only set to spotsList mode if current mode is home
        if (this.ngRedux.getState().appMode === AppModes.Home) {
            this.ngRedux.dispatch({
                type: AppModeActions.SET_MODE_NAVIGATE
            });
        }

        window['ga']('send', 'event', 'appmode', 'spots-list', 'release-1');
    }

}
