export type MapModes = 'street' | 'satellite';

export interface MapState {
    center: GeoJSON.Position;
    zoom: number;
    mode: string;
}
