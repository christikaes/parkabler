import { Component, OnInit, ViewChild } from '@angular/core';
import { NgRedux, select } from '@angular-redux/store';
import { IAppState, Spot } from '~/store';
import { Observable } from 'rxjs/Observable';
import { AppModeActions, SpotsActions, MapActions } from '~/actions';
import { AppModes } from '~/util';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const turfHelper = require('@turf/helpers');

@Component({
  selector: 'pa-edit-drawer',
  templateUrl: './edit-drawer.component.html',
  styleUrls: ['./edit-drawer.component.scss']
})

export class EditComponent implements OnInit {
  public submitted = false;
  public selected: FormGroup;
  public details: FormGroup;
  public AppModes = AppModes;

  @ViewChild('stepper') stepper;

  @select() public appMode$: Observable<AppModes>;
  @select(['spots', 'active']) private spotActive$: Observable<Spot>;

  constructor(
    private ngRedux: NgRedux<IAppState>,
    private appModeActions: AppModeActions,
    private spotsActions: SpotsActions,
    private mapActions: MapActions,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    let activeSpot = this.ngRedux.getState().spots.active;
    this.selected = this.formBuilder.group({
      spot: [activeSpot, Validators.required]
    });

    this.details = this.formBuilder.group({
      quantity: [activeSpot ? activeSpot.properties.quantity : null, Validators.required],
      cost: activeSpot ? activeSpot.properties.cost : null,
      description: activeSpot ? activeSpot.properties.description : null
    });

    // Whenever the selectedSpot updates, update all the selected and details forms
    this.spotActive$.subscribe(spot => {
      this.selected.controls.spot.setValue(spot);
      this.details.controls.quantity.setValue(spot ? spot.properties.quantity : null);
      this.details.controls.cost.setValue(spot ? spot.properties.cost : null);
      this.details.controls.description.setValue(spot ? spot.properties.description : null);
    });

    this.appMode$.subscribe(appMode => {
      if (appMode === AppModes.Edit) {
        // Make the map interactable for setting the location
        this.mapActions.setInteractable(true);
        // Reset Stepper
        this.stepper._selectedIndex = 0; // HACK: Can't reset selectedIndex
        this.submitted = false;

        activeSpot = this.ngRedux.getState().spots.active;

        this.selected = this.formBuilder.group({
          spot: [activeSpot, Validators.required]
        });

        this.details = this.formBuilder.group({
          quantity: [activeSpot ? activeSpot.properties.quantity : null, Validators.required],
          cost: activeSpot ? activeSpot.properties.cost : null,
          description: activeSpot ? activeSpot.properties.description : null
        });

      } else {
        this.mapActions.setInteractable(true);
      }
    });

  }

  public onClose() {
    this.appModeActions.unsetMode();
    this.mapActions.setInteractable(true);
  }

  private submit() {
    this.submitted = true;
    // Create a new Spot and add it to the addSpots
    const newSpot = {
      ...this.selected.controls.spot.value,
      properties: {
        ...this.selected.controls.spot.value.properties,
        addedBy: this.ngRedux.getState().userID,
        verified: false,
        ...this.details.value
      }
    };

    this.spotsActions.updateUserSpot(newSpot);
  }

  public onStepChange({ selectedIndex, previouslySelectedIndex }) {
    // * -> 0 (Location)
    if (selectedIndex === 0) {
      // Reset the selected spot
      this.selected.controls.spot.setValue(this.ngRedux.getState().spots.active);
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
      this.mapActions.setInteractable(true);
      this.submit();
    }
  }

}
