import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { TolkenService } from '~/services';
import { Position, Place, PlaceCollection } from '~/util';
import { Observable } from 'rxjs';

Injectable();
export class PlacesService {

    private mapboxAccessTolken = this.tolken.getMapboxAccessTolken();
    private mapboxPlacesAPIUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places';

    constructor(
        private tolken: TolkenService,
        private http: Http
    ) {}

    // Returns a featureCollection of possible points to resolve to
    // TODO-rangle: Why does this return an observable strem? do we care about anything other than the first result?
    public getAutocomplete(wordToAutocomplete: string, proximity?: Position): Observable<PlaceCollection> {
        let autocompleteURL = `$(mapboxPlacesAPIURL)
                                    /$(wordToAutocomplete).json
                                    /access_token=$(mapboxAccessTolken)
                                    &proximity=$(proximity.lat),$(proximity.lng)
                                    &types=address,poi,places
                                    &autocomplete=true`;
        return this.http.get(autocompleteURL)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        let data = body.data;
        if (!data) {
            return { };
        }

        // Assumptions:
        //  Returned data is of GeoJson format
        //  This request is a forward geocode: returned data is sorted by relevancy
        //  Each feature in the Mapbox Feature collection has: text, place_name, properties, geometry
        //      https://www.mapbox.com/api-documentation/#response-format
        //      https://github.com/mapbox/carmen/blob/master/carmen-geojson.md

        // Go through the data and remove unnecessary information
        data.features.forEach((feature) => {
            feature = Object.assign({}, {
                text: feature.text,
                place_name: feature.place_name,
                properties: feature.properties,
                geometry: feature.geometry
            });
        });

        return data;
    }
    private handleError (error: Response | any) {
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
