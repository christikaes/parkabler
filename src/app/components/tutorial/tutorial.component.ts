import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from 'ng2-redux';
import { MdDialog, MdDialogRef } from '@angular/material';
import { TutorialDialogComponent } from './tutorial-dialog';
import { Observable } from 'rxjs';
import { TutorialActions } from '~/actions';
import { TutorialState, Tutorial } from '~/util';
import { IAppState } from '~/store';

@Component({
    selector: 'pa-tutorial',
    templateUrl: './tutorial.component.html'
})
export class TutorialComponent implements OnInit {
    private dialogRef: MdDialogRef<TutorialDialogComponent>;

    @select() private tutorial$: Observable<TutorialState>;

    constructor(
        private dialog: MdDialog,
        private tutorialActions: TutorialActions,
        private ngRedux: NgRedux<IAppState>
    ) {}

    ngOnInit() {
        this.tutorial$.subscribe((tutorialState: TutorialState) => {
            // Note: the dialog takes care of closing itself, we just have to open it
            if (tutorialState.open) {
                this.openTutorial();
            } else {
                // If something outside of the dialog framework asks to close this
                this.dialog.closeAll();
            }
        });
    }

    private openTutorial() {
        let {tutorial} = this.ngRedux.getState();
        let dialogConfig = {
            data: tutorial.tutorial
        };
        this.dialogRef = this.dialog.open(TutorialDialogComponent, dialogConfig);
        this.dialogRef.afterClosed().first().subscribe(() => {
            this.tutorialActions.close();
        });
    }

    public onClickTutorial() {
        this.tutorialActions.open();
    }
}
