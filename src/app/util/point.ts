import { Feature } from 'geojson';

export type SpotType = 'regular' | 'accessible';

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

export interface Spot2 extends GeoJSON.Feature<GeoJSON.Point> {
  id: string,
  properties: {
    addedBy: string;
    verified: boolean;
    quantity: number;
    cost?: string;
    commercial?: boolean;
    description?: string;
  }
}

