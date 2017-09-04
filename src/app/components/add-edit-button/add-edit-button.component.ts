import { Component, OnInit } from '@angular/core';
import { AppModeActions } from '~/actions';
import Animations from '~/animations';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '~/store';
import { Observable } from 'rxjs';
import { AppModes } from '~/util';

@Component({
  selector: 'pa-add-edit-button',
  templateUrl: './add-edit-button.component.html',
  styleUrls: ['./add-edit-button.component.scss'],
  animations: Animations
})

export class AddEditButtonComponent implements OnInit {
  public showAddButton: boolean;

  @select() private appMode$: Observable<AppModes>;

  constructor(
    private appModeActions: AppModeActions
  ) { }

  ngOnInit() {
    this.appMode$.subscribe((mode: AppModes) => {
      this.showAddButton = mode !== AppModes.AddSpot && mode !== AppModes.ReportSpot;
    });
  }

  onOpenAddSpot() {
    this.appModeActions.setModeAddSpot();
  }
}
