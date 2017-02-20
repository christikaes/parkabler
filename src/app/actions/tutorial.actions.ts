import { Injectable } from '@angular/core';
import { IAppState } from '~/store';
import { NgRedux } from 'ng2-redux';

@Injectable()
export class TutorialActions {
    static OPEN = 'PA/TUTORIAL/OPEN';
    static CLOSE = 'PA/TUTORIAL/CLOSE';
    static SET = 'PA/TUTORIAL/SET';

    constructor(
        private ngRedux: NgRedux<IAppState>
    ) {}

    public open() {
        this.ngRedux.dispatch({
            type: TutorialActions.OPEN
        });
    }

    public close() {
        this.ngRedux.dispatch({
            type: TutorialActions.CLOSE
        });
    }

    // Set the tab whenever the 'mode' changes:
    // Eg: When adding spots, set tab to addSpots
    // So that when the user opens the dialog, it opens to the relavant tutorial
    public setTab(tab: number) {
        this.ngRedux.dispatch({
            type: TutorialActions.SET,
            payload: tab
        });
    }
}
