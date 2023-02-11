/* eslint-disable react/destructuring-assignment */
import React, { useState, useEffect, useRef } from 'react';

// openlayers
import Map from 'ol/Map';
import View from 'ol/View';
import Point from 'ol/geom/Point';
import Feature from 'ol/Feature';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { fromLonLat } from 'ol/proj';
import { Cluster, OSM, Vector as VectorSource } from 'ol/source';
import 'ol/ol.css';

// materialUI
import { Box } from '@mui/material';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

function MapWrapper({ locationData, currentLocation }) {
  // initial state
  const [map, setMap] = useState();
  // pull refs
  const mapElement = useRef();
  // create state ref that can be accessed in OpenLayers onclick callback function
  const mapRef = useRef();
  mapRef.current = map;

  // initialize map on first render
  useEffect(() => {
    if (map == null) {
      const AllLocation = locationData.map((loc) => {
        const feature = new Feature({
          geometry: new Point(fromLonLat(loc.location)),
          name: `${loc.name}`,
        });
        return feature;
      });

      const source = new VectorSource({
        features: AllLocation,
      });

      const clusterSource = new Cluster({
        source,
      });
      const styleCache = {};
      const initalFeaturesLayer = new VectorLayer({
        source: clusterSource,
        style() {
          const size = locationData.lenght;
          let style = styleCache[size];
          if (!style) {
            style = new Style({
              image: new Icon({
                src: 'http://cdn.mapmarker.io/api/v1/pin?text=RP&size=40&hoffset=1',
              }),
            });
            styleCache[size] = style;
          }
          return style;
        },
      });

      const initialMap = new Map({
        target: mapElement.current,
        layers: [
          new TileLayer({
            source: new OSM(),
          }),
          initalFeaturesLayer,
        ],

        view: new View({
          center: fromLonLat(locationData[0].location),
          zoom: 16,
          maxZoom: 18,
        }),
      });
      setMap(initialMap);
    }
  }, []);

  // update map if features prop changes
  useEffect(() => {
    if (map != null) {
      const currentLoc = locationData.filter((loc) => loc.name === currentLocation);
      map.setView(
        new View({
          center: fromLonLat(currentLoc[0].location),
          zoom: 16,
        }),
      );
    }
  }, [currentLocation]);

  return <Box height={500} ref={mapElement} className="map-container" />;
}

export default MapWrapper;
