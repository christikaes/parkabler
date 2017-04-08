export interface Spot {
  key: string;
  coordinates: GeoJSON.Position;
  numspots: number;
}

export type Spots = Spot[];

export interface NearbySpot extends Spot {
  distanceToDestination: number;
}

export type NearbySpots = NearbySpot[];

export function convertToGeoJson(spots: Spots) {
    if (spots.length === 0) {
      return {};
    }

    let spotsGeoJson = {
        type: 'FeatureCollection',
        features: []
    };

    spots.forEach(spot => {
        spotsGeoJson.features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: spot.coordinates
            },
            properties: {
              numspots: spot.numspots,
              icon: 'marker'
            }
        });
    });

    return spotsGeoJson;
}

export function distanceBetween(p1: GeoJSON.Position, p2: GeoJSON.Position): number {
    if (!p1 || !p2) {
      return 0;
    }

    let R = 6371; // Radius of the Earth in km
    let dLat = (p2[1] - p1[1]) * Math.PI / 180;
    let dLon = (p2[0] - p1[0]) * Math.PI / 180;
    let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(p1[1] * Math.PI / 180) * Math.cos(p2[1] * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c;
    return d;
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
