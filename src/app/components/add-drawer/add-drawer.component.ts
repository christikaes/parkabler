import { Component, OnInit, ViewChild } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState } from '~/store';
import { Observable } from 'rxjs/Observable';
import { AppModeActions, SpotsActions, MapActions } from '~/actions';
import { AppModes } from '~/util';
const uuidv4 = require('uuid/v4');
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const turfHelper = require('@turf/helpers');

@Component({
  selector: 'pa-add-drawer',
  templateUrl: './add-drawer.component.html',
  styleUrls: ['./add-drawer.component.scss']
})

export class AddSpotComponent implements OnInit {
  public submitted = false;
  public location: FormGroup;
  public details: FormGroup;
  public AppModes = AppModes;

  @ViewChild('stepper') stepper;

  @select() public appMode$: Observable<AppModes>;
  @select(['map', 'center']) private mapCenter$: Observable<GeoJSON.Position>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private appModeActions: AppModeActions,
    private spotsActions: SpotsActions,
    private mapActions: MapActions,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this.location = this.formBuilder.group({
      coordinates: [null, Validators.required]
    });
    // Whenever the mapCenter updates, set the location coordinates
    // Only update the coords if this is a new position
    this.mapCenter$.pairwise().subscribe(pairwiseCenter => {
      if (Math.round(Math.abs(pairwiseCenter[0][0] - pairwiseCenter[1][0]) * 10000) > 0
        || Math.round(Math.abs(pairwiseCenter[0][1] - pairwiseCenter[1][1]) * 10000) > 0) {
        this.location.controls.coordinates.setValue(pairwiseCenter[1]);
      }
    });

    this.details = this.formBuilder.group({
      quantity: [null, Validators.required],
      cost: null,
      description: null
    });

    this.appMode$.subscribe(appMode => {
      if (appMode === AppModes.Add) {
        // Show the map overlay for setting the location
        this.mapActions.setAddSpotOverlay(true);
        this.mapActions.setInteractable(true);
        // Reset Stepper
        this.stepper._selectedIndex = 0; // HACK: Can't reset selectedIndex
        this.submitted = false;
        this.location.reset();
        this.details.reset();
      } else {
        this.mapActions.setAddSpotOverlay(false);
        this.mapActions.setInteractable(true);
      }
    });
  }

  public onClose() {
    this.appModeActions.unsetMode();
    this.mapActions.setInteractable(true);
    this.mapActions.setAddSpotOverlay(false);
  }

  private submit() {
    this.submitted = true;
    // Create a new Spot and add it to the addSpots
    const newSpot = turfHelper.feature({
      type: 'Point',
      ...this.location.value
    }, {
        addedBy: this.ngRedux.getState().userID,
        verified: false,
        ...this.details.value
      });
    newSpot.id = uuidv4();

    console.log(newSpot);
    this.spotsActions.updateUserSpot(newSpot);
  }

  public onStepChange({ selectedIndex, previouslySelectedIndex }) {
    // * -> 0 (Location)
    if (selectedIndex === 0) {
      // Unset location, set the map overlay, and make it interactable
      this.location.controls.coordinates.setValue(null);
      this.mapActions.setAddSpotOverlay(true);
      this.mapActions.setInteractable(true);
    }
    // 0 (Location) -> 1 (Details)
    // make the map nonInteractable
    if (previouslySelectedIndex === 0 && selectedIndex === 1) {
      this.mapActions.setInteractable(false);
    }
    // 1 (Details) -> 2 (Done)
    // submit the spot
    if (previouslySelectedIndex === 1 && selectedIndex === 2) {
      this.mapActions.setAddSpotOverlay(false);
      this.mapActions.setInteractable(true);
      this.submit();
    }
  }
}
