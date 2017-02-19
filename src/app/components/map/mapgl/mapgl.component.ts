import { Component, Input, OnInit, AfterViewInit, OnChanges, ViewChild, SimpleChanges } from '@angular/core';
import { BaseMapComponent } from '~/components/map';
import { MapModes, Position, Spots, convertToGeoJson } from '~/util';
const mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

// Use this for the opensource maps:
// var mapstyle = require('./style.json');

@Component({
  selector: 'pa-map-gl',
  templateUrl: './mapgl.component.html',
  styleUrls: ['./mapgl.component.scss']
})
export class MapGLComponent extends BaseMapComponent {
  @ViewChild('MapDiv') MapDiv;
  private map: any;

  constructor() {
    super();
  }

  initializeMap(done: (boolean) => void): void {
    // TODO-rangle: how do i store this key safely?
    mapboxgl.accessToken = 'pk.eyJ1IjoiY2hyaXN0aWthZXMiLCJhIjoiY2l6M2htYjB4MDV0aTMycHhvamVzenJwNSJ9.XJpbIPXuOhlu7T9riCD77g';
    let mapDiv = this.MapDiv.nativeElement;
    let map = new mapboxgl.Map({
      container: mapDiv,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-71.06, 42.35],
      zoom: 15
    });
    // HACK: Not sure why canvas is set to absolute position, but it breaks styling:
    map.getCanvas().style.position = 'initial';

    // TODO: a lot of this can be moved to style.json so that it happens before load
    // Setup the spots layer
    map.on('load', () => {

      // Add a new source from our GeoJSON data and set the
      // 'cluster' option to true.
      map.addSource('spots', {
          type: 'geojson',
          data: {'type': 'FeatureCollection', 'features': []},
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
      });

      // Use the spots source to create five layers:
      // One for unclustered points, three for each cluster category,
      // and one for cluster labels.
      map.addLayer({
          'id': 'unclustered-points',
          'type': 'symbol',
          'source': 'spots',
          'filter': ['!has', 'point_count'],
          layout: {
            'icon-image': '{icon}-15',
            'icon-allow-overlap': true
          }
      });

      // Display the spots data in three layers, each filtered to a range of
      // count values. Each range gets a different fill color.
      let layers = [
          [20, '#f28cb1'],
          [10, '#f1f075'],
          [0, '#51bbd6']
      ];

      layers.forEach(function (layer, i) {
          map.addLayer({
              'id': 'cluster-' + i,
              'type': 'circle',
              'source': 'spots',
              'paint': {
                  'circle-color': layer[1],
                  'circle-radius': 18
              },
              'filter': i === 0 ?
                  ['>=', 'point_count', layer[0]] :
                  ['all',
                      ['>=', 'point_count', layer[0]],
                      ['<', 'point_count', layers[i - 1][0]]]
          });
      });

      // Add a layer for the clusters' count labels
      map.addLayer({
          'id': 'cluster-count',
          'type': 'symbol',
          'source': 'spots',
          'layout': {
              'text-field': '{point_count}',
              'text-font': [
                  'DIN Offc Pro Medium',
                  'Arial Unicode MS Bold'
              ],
              'text-size': 12
          }
      });

      done(true);
    });

    this.map = map;
  }

  updateZoom(zoom: number) {
    this.map.zoomTo(zoom);
  }

  setMode(mode: MapModes) {
    // TODO: setting style removes all layers, turn on and off layers instead
    switch (mode) {
      case 'satellite':
        this.map.setStyle('mapbox://styles/mapbox/satellite-streets-v9');
        break;
      case 'street':
        this.map.setStyle('mapbox://styles/mapbox/streets-v9');
        break;
      default:
        this.map.setStyle('mapbox://styles/mapbox/streets-v9');
        break;
    }
  }

  setCenter(center: Position) {
    this.map.flyTo({center: [center.lng, center.lat]});
  }

  setSpots(spots: Spots) {
    let spotsGeoJson = convertToGeoJson(spots);
    this.map.getSource('spots').setData(spotsGeoJson);
  }

}
