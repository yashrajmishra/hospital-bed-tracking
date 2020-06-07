import React, { useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import L from "leaflet";
import { Marker } from "react-leaflet";

import Map from "components/Map";
import axios from "axios";
import useSWR from "swr";

import sampleData from "./sampleData.json";

const LOCATION = {
  lat: 23.767016,
  lng: 78.614674,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 4.5;

const here_space_id = "H8TuI2tP";
const here_access_token = "ADqfe44mQe-Nm0N1ybpXnwA";

const MapMaker = () => {
  // LOOK HERE: fuck axios lets try SWR because i love vercel(ziet actually)
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    `https://xyz.api.here.com/hub/spaces/${here_space_id}/bbox?west=-180&north=90&east=180&south=-90&access_token=${here_access_token}`,
    fetcher
  );
  if (error) return;
  // if (!data) return <div>loading...</div>;

  /**
   * mapEffect
   * @description Fires a callback once the page renders
   * @example Here this is and example of being used to zoom in and set a popup on load
   */

  async function mapEffect({ leafletElement: map } = {}) {
    if (!map) return;
    //LOOK HERE: this is the data fetch block
    let response = data;
    console.log(JSON.stringify(data));

    // FIXME: enable dynamic loading
    // try {
    //   response = await axios.get(
    //     `https://xyz.api.here.com/hub/spaces/${here_space_id}/bbox?west=-180&north=90&east=180&south=-90&access_token=${here_access_token}`,
    //     {
    //       headers: {
    //         "Access-Control-Allow-Origin": "yashraj.now.sh",
    //       },
    //     }
    //   );
    //   console.log(JSON.stringify(response.data));
    // } catch (e) {
    //   console.log(`Failed to fetch hospital data: ${e.message}`, e);
    //   return;
    // }

    const geoJsonLayers = new L.GeoJSON(response, {
      pointToLayer: (feature = {}, latlng) => {
        const { properties = {} } = feature;

        const {
          hospitalName,
          totalBed,
          equiptedBed,
          availableBed,
          emergencyContact,
        } = properties;

        const html = `
            <span class="icon-marker">
              <span class="icon-marker-tooltip">
                <h2>${hospitalName}</h2>
                <ul>
                <li><strong>Contact no:</strong> ${emergencyContact}</li>
                <li><strong>Available Beds:</strong> ${availableBed}</li>
                <li><strong>Equipted Beds:</strong> ${equiptedBed}</li>
                <li><strong>Total Beds:</strong> ${totalBed}</li>
                </ul>
              </span>
              ${availableBed}
            </span>
          `;

        return L.marker(latlng, {
          icon: L.divIcon({
            className: "icon",
            html,
          }),
          riseOnHover: true,
        });
      },
    });

    geoJsonLayers.addTo(map);

    // LOOK HERE: section ends here
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return <Map {...mapSettings}></Map>;
};

export default MapMaker;
