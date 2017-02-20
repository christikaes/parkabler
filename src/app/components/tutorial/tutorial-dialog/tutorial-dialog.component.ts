import { Component } from '@angular/core';
import { MdDialogRef } from '@angular/material';

@Component({
    templateUrl: './tutorial-dialog.component.html',
    styleUrls: ['./tutorial-dialog.component.scss']
})
export class TutorialDialogComponent {
    constructor(
        private dialogRef: MdDialogRef<TutorialDialogComponent>
    ) {}
}

