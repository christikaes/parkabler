import { MapLocationService, GeolocationService, DestinationLocationService } from '../services';

export class RecenterControl {
  constructor(
    private mapLocation: MapLocationService,
    private geoLocation: GeolocationService,
    private destinationLocation: DestinationLocationService
  ) {}

  createControl(controlDiv, map) : void {
    // Set CSS for the control border.
    var controlUI = document.createElement('div');
    controlUI.style.backgroundColor = '#fff';
    controlUI.style.border = '2px solid #fff';
    controlUI.style.borderRadius = '3px';
    controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
    controlUI.style.cursor = 'pointer';
    controlUI.style.marginBottom = '4px';
    controlUI.style.marginRight = '10px';
    controlUI.style.textAlign = 'center';
    controlUI.title = 'Click to recenter the map';
    controlUI.style.backgroundImage = "url(img/ic_my_location.png)";
    controlUI.style.backgroundSize = "24px 24px";
    controlUI.style.height = '24px';
    controlUI.style.width = '24px';
    controlDiv.appendChild(controlUI);

    // Setup the click event listeners
    // Set the center of the map to the current position
    controlUI.addEventListener('click', function() {
      this.geoLocation.currentLocation()
        .then((p: Position) => {
          this.mapLocation.set(p);
          this.destinationLocation.set(p);
        });
    }.bind(this));
  }
}
