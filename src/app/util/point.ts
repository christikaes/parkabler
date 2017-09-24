import { Feature } from 'geojson';

// PLACE
export interface Place extends GeoJSON.Feature<GeoJSON.Point> {
  text: string;
  place_name: string;
}

export interface PlaceCollection extends GeoJSON.GeoJsonObject {
  type: 'FeatureCollection';
  features: Array<Place>;
}
