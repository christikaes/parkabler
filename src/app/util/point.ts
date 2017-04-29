export type SpotType = 'regular'|'accessible';

export interface Spot {
  key: string;
  coordinates: GeoJSON.Position;
  numspots: number;
  type: SpotType;
  addedBy: string;
  verified: boolean;
}

// PLACE
export interface Place extends GeoJSON.Feature<GeoJSON.Point> {
  text: string;
  place_name: string;
}

export interface PlaceCollection extends GeoJSON.GeoJsonObject {
  type: 'FeatureCollection';
  features: Array<Place>;
}
