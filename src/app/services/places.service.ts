import { Injectable, Inject } from '@angular/core';
import { MapboxAccessTolken } from '~/util';
import { Http, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import { Position, Place, PlaceCollection } from '~/util';

Injectable();
export class PlacesService {

    private mapboxAccessTolken = MapboxAccessTolken;
    private mapboxPlacesAPIUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

    // TODO-rangle: Why do I have to inject http explicitly?
    // The httpmodule is included in app.module
    constructor(
        @Inject(Http) public http: Http
    ) {}

    // Returns a featureCollection of possible points to resolve to
    // TODO-rangle: Why does Http return an observable strem? do we care about anything other than the first result?
    public getAutocomplete(wordToAutocomplete: string, proximity?: Position): Observable<Place[]> {

        let autocompleteUrlSearchParams = new URLSearchParams();
        autocompleteUrlSearchParams.set('access_token', this.mapboxAccessTolken);
        autocompleteUrlSearchParams.set('types', 'address,poi,place');
        autocompleteUrlSearchParams.set('autocomplete', 'true');
        autocompleteUrlSearchParams.set('country', 'us');
        if (proximity) {
            autocompleteUrlSearchParams.set('proximity', `${proximity.lat},${proximity.lng}`);
        }

        return this.http.get(this.mapboxPlacesAPIUrl + wordToAutocomplete + '.json', {search: autocompleteUrlSearchParams})
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let data = res.json();
        if (!data ) {
            return { };
        }

        // Assumptions:
        //  Returned data is of GeoJson format
        //  This request is a forward geocode: returned data is sorted by relevancy
        //  Each feature in the Mapbox Feature collection has: text, place_name, properties, geometry
        //      https://www.mapbox.com/api-documentation/#response-format
        //      https://github.com/mapbox/carmen/blob/master/carmen-geojson.md

        // Go through the data and remove unnecessary information
        let thinFeatures = [];
        data.features.forEach((feature) => {
            thinFeatures.push({
                text: feature.text,
                place_name: feature.place_name,
                properties: feature.properties,
                geometry: feature.geometry
            });
        });
        return thinFeatures;
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
