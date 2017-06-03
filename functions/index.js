const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// Whenever a spot is added to addspots, copy it into the list of all spots
exports.copyAddSpotsToSpots = functions.database.ref('/addspots/{spotid}')
    .onWrite(event => {
        var addedSpot = event.data.val();
        console.log(JSON.stringify(event));
        event.data.ref.root.child('spotsall').push(addedSpot);
    });
    