import React, { useRef } from "react";
import { Helmet } from "react-helmet";
import L from "leaflet";
import { Marker } from "react-leaflet";

import { promiseToFlyTo, getCurrentLocation } from "lib/map";

import Layout from "components/Layout";
import Container from "components/Container";
import Map from "components/Map";
import MapMaker from "../components/MapMaker";

import gatsby_astronaut from "assets/images/gatsby-astronaut.jpg";

const LOCATION = {
  lat: 23.767016,
  lng: 78.614674,
};
const CENTER = [LOCATION.lat, LOCATION.lng];
const DEFAULT_ZOOM = 2;
const ZOOM = 10;

const timeToZoom = 2000;
const timeToOpenPopupAfterZoom = 4000;
const timeToUpdatePopupAfterZoom = timeToOpenPopupAfterZoom + 3000;

const popupContentHello = `<p>Hello 👋</p>`;
const popupContentGatsby = `
  <div class="popup-gatsby">
    <div class="popup-gatsby-image">
      <img class="gatsby-astronaut" src=${gatsby_astronaut} />
    </div>
    <div class="popup-gatsby-content">
      <h1>HERE you are</h1>
      <p>you came too early but stay tuned while this gets finished</p>
    </div>
  </div>
`;

const IndexPage = () => {
  const markerRef = useRef();

  /**
   * mapEffect
   * @description Fires a callback once the page renders please use wisely
   */

  async function mapEffect({ leafletElement: map } = {}) {
    if (!map) return;

    const popup = L.popup({
      maxWidth: 800,
    });

    const location = await getCurrentLocation().catch(() => LOCATION);

    const { current = {} } = markerRef || {};
    console.log(location);
    const { leafletElement: marker } = current;

    marker.setLatLng(location);
    popup.setLatLng(location);
    popup.setContent(popupContentHello);

    setTimeout(async () => {
      await promiseToFlyTo(map, {
        zoom: ZOOM,
        center: location,
      });

      marker.bindPopup(popup);

      setTimeout(() => marker.openPopup(), timeToOpenPopupAfterZoom);
      setTimeout(
        () => marker.setPopupContent(popupContentGatsby),
        timeToUpdatePopupAfterZoom
      );
    }, timeToZoom);
  }

  const mapSettings = {
    center: CENTER,
    defaultBaseMap: "OpenStreetMap",
    zoom: DEFAULT_ZOOM,
    mapEffect,
  };

  return (
    <Layout pageName="home">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      <Map {...mapSettings}>
        <Marker ref={markerRef} position={CENTER} />
      </Map>

      <Container type="content" className="text-center home-start">
        <h2>welcome</h2>
        <p>now chill up</p>
      </Container>
      <MapMaker />
    </Layout>
  );
};

export default IndexPage;
