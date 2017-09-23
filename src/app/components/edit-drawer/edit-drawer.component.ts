import { Component } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '~/store';
import { Observable } from 'rxjs/Observable';
import { AppModeActions, SpotsAddActions, MapActions } from '~/actions';
import { AppModes, Spot2 } from '~/util';

const turfHelper = require('@turf/helpers');

@Component({
  selector: 'pa-edit-drawer',
  templateUrl: './edit-drawer.component.html',
  styleUrls: ['./edit-drawer.component.scss']
})

export class EditComponent {
  public open = false;
  public newSpotDetails = {
    cost: null,
    description: null,
    quantity: 1
  };
  private focusedSpot: string;

  @select() private appMode$: Observable<AppModes>;
  @select() private spotSelected$: Observable<GeoJSON.Feature<GeoJSON.Point>>;
  @select(['spot']) public focusedSpot$: Observable<string>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private appModeActions: AppModeActions,
    private spotsAddActions: SpotsAddActions,
    private mapActions: MapActions
  ) {
    // Whenever add spot is opened, show the add spot overlay over the map
    this.appMode$.subscribe(appMode => {
      if (appMode === AppModes.Edit) {
        this.onOpen();
      }
    });
  }

  private onOpen() {
    this.open = true;
  }

  public onClose() {
    this.open = false;
    this.appModeActions.unsetMode();
    this.mapActions.setInteractable(true);
  }

  public onSetLocation() {
    this.focusedSpot = this.ngRedux.getState().spot;
    this.mapActions.setInteractable(false);
  }

  public onUnsetLocation() {
    this.mapActions.setInteractable(true);
  }

  public onSubmit() {
    // Create a new Spot and add it to the addSpots
    this.ngRedux.getState().spots.features.find(s => s.id === this.focusedSpot);
    const newSpot = Object.assign({}, );
    newSpot.properties.addedBy = this.ngRedux.getState().userID;
    newSpot.properties.verified = false;
    newSpot.properties.quantity = this.newSpotDetails.quantity;
    newSpot.properties.cost = this.newSpotDetails.cost;
    newSpot.properties.description = this.newSpotDetails.description;

    this.spotsAddActions.editSpot(newSpot);

    // Reset the Map overlay and interactiveness
    this.mapActions.setInteractable(true);
  }

}
