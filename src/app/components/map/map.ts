
type MapModes = "street" | "satellite";

interface Map {
  // Initialize the Map
  initializeMap();

  // Markers
  setMarkers(markers: Position[]);

  // Increase or decrease the zoom by the given amount
  updateZoom(zoom : number);

  // Change between mapModes
  setMode(mode: MapModes);

  // Update the Destination
  //   This will drop a destination marker on the map
  //   If the destination is set to the current location,
  //     update the destination as current location updates
  //   If the destination is null, remove the marker
  setDestination(destinationIsCurrentLocation: boolean, destination?: Position);

  // Update the user's current location
  //   This will drop a user marker on the map
  //   If it is null, it will remove the marker
  setCurrentLocation(currentLocation?: Position);

  // Nearby Markers
  setNearbyMarkers(nearbyMarkers: Position[]);

  // Set Add Spot Mode

}

export {Map, MapModes};
