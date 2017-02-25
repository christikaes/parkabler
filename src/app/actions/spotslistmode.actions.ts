import { Injectable } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { IAppState } from '~/store';


@Injectable()
export class SpotsListModeActions {
    static SET_MODE_OPEN = 'PA/ADDSPOTMODE/OPEN';
    static SET_MODE_CLOSED = 'PA/ADDSPOTMODE/CLOSED';
    static SET_MODE_EXPANDED= 'PA/ADDSPOTMODE/EXPANDED';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {}

    public setModeOpen() {
        this.ngRedux.dispatch({
            type: SpotsListModeActions.SET_MODE_OPEN
        });
    }

    public setModeClosed() {
        this.ngRedux.dispatch({
            type: SpotsListModeActions.SET_MODE_CLOSED
        });
    }

    public setModeSetExpanded() {
        this.ngRedux.dispatch({
            type: SpotsListModeActions.SET_MODE_EXPANDED
        });
    }
}
