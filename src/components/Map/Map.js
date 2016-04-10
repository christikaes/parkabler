
import React from 'react';
import {GoogleMapLoader, GoogleMap, Marker} from "react-google-maps";

export default function SimpleMap () {
  return (
    <section style={{height: "100%"}}>
      <GoogleMapLoader
        containerElement={
          <div
            style={{
              height: "300px",
              width: "300px"
            }}
          />
        }
        googleMapElement={
          <GoogleMap
            ref={(map) => console.log(map)}
            defaultZoom={3}
            defaultCenter={{lat: -25.363882, lng: 131.044922}}
            >
              <Marker position={{ lat: 25.0112183, lng: 121.52067570000001 }}
                      key="Taiwan"
                      defaultAnimation= {2} />
          </GoogleMap>
        }
      />
    </section>
  );
}
