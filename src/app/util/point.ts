export interface Position {
  lat: number;
  lng: number;
}

export interface Spot {
  key: string;
  position: Position;
  numspots: number;
}

export type Spots = Spot[];

export function convertToGeoJson(spots: Spots) {
    if (spots.length === 0) {
      return {};
    }

    // TODO-rangle: GeoJson types aren't working ):
    let spotsGeoJson = {
        type: 'FeatureCollection',
        features: []
    };

    spots.forEach(spot => {
        spotsGeoJson.features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [spot.position.lng, spot.position.lat]
            },
            properties: {
              numspots: spot.numspots
            }
        });
    });

    return spotsGeoJson;
}
