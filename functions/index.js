const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const osmtogeojson = require('osmtogeojson');
const request = require('request');
const turf_distance = require('@turf/distance');
const turf_bearing = require('@turf/bearing');
const turf_helpers = require('@turf/helpers');

var getDistanceFromPointToLine = function (A, B, C) {
  // Line AB, point C
  var bearing_CA = turf_bearing(turf_helpers.point(C), turf_helpers.point(A));
  var bearing_CB = turf_bearing(turf_helpers.point(C), turf_helpers.point(B));
  var distance_CB = turf_distance(turf_helpers.point(C), turf_helpers.point(B));

  var R = 6371; // Radius of earth in km

  // http://www.movable-type.co.uk/scripts/latlong.html Cross track distance
  var dXt = Math.asin(Math.sin(distance_CB / R) * Math.sin(bearing_CB - bearing_CA)) * R;

  return Math.round(Math.abs(dXt) * 100000) / 100; // Dist in Meters
}

// Whenever a spot is added to addspots, copy it into the list of all spots
exports.copyAddSpotsToSpots = functions.database.ref('/addspots/{spotid}')
  .onWrite(event => {
    // Keep the function alive until we are done
    return new Promise((resolve, reject) => {

      // Spot that was added
      var addedSpot = event.data.val();

      // Get residential roads nearby the added spot
      var spotCoords = addedSpot.geometry.coordinates;
      var bbox = `${spotCoords[1] - 0.01},${spotCoords[0] - 0.01},${spotCoords[1] + 0.01},${spotCoords[0] + 0.01}`;
      var url = `http://overpass-api.de/api/interpreter?data=[out:json][timeout:25];` +
        `(node[%22highway%22=%22residential%22](${bbox});way[%22highway%22=%22residential%22](${bbox});relation[%22highway%22=%22residential%22](${bbox}););` +
        `out;%3E;out%20skel%20qt;`;

      request(url, (error, response, body) => {
        if (error) {
          reject('ERROR: ' + error);
        }
        if (!response || response.statusCode != 200) {
          reject('ERROR: Response StatusCode ' + response.statusCode);
        }

        var residentialStreetFeatureCollection = osmtogeojson(JSON.parse(body));

        var minDist = 5;
        // Check to see if there are any residentialStreets nearby our point
        residentialStreetFeatureCollection.features.forEach((residentialStreetFeature) => {
          // Shortcircuit if not linestring
          if (residentialStreetFeature.geometry.type !== "LineString") {
            return;
          }
          // For each linesegment, find the distance from the point to the line
          var lineStringCoords = residentialStreetFeature.geometry.coordinates;
          for (i = 1; i < lineStringCoords.length; i++) {
            var A = lineStringCoords[i - 1];
            var B = lineStringCoords[i];
            var C = spotCoords;
            var dist = getDistanceFromPointToLine(A, B, C);
            if (dist < minDist) {
              minDist = dist;
            }
          }
        });

        // Only add spots that are greater than 1 meter away from a residential street
        if (minDist > 1) {
          event.data.adminRef.root.child('spotsall').push(addedSpot)
            .then(() => {
              resolve("Spot Added");
            })
            .catch(err => {
              reject("ERROR: " + err);
            });
        } else {
          reject("Spot Not Added: " + minDist + "m near residential street");
        }
      });
    });
  });
