import React from "react";
import { Map, Marker, Popup, TileLayer, Circle } from "react-leaflet";

const position = [53.472092, -2.238665];

const HeatMap = ({ data18, data19, data20 }) => {
  return (
    <Map center={position} zoom={14}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {[...data18, ...data19, ...data20].map((stop, i) => {
        return (
          <Marker
            key={`data ${i} ${stop.lat}`}
            position={[stop.lat, stop.lon]}
            opacity={0}
          >
            <Circle
              center={{
                lat: stop.lat,
                lng: stop.lon,
              }}
              fillColor={
                stop.year === "2018"
                  ? "blue"
                  : stop.year === "2019"
                  ? "red"
                  : "green"
              }
              color={
                stop.year === "2018"
                  ? "blue"
                  : stop.year === "2019"
                  ? "red"
                  : "green"
              }
              weight={0.75}
              radius={125}
            />
            <Popup>
              Age range: {stop.age ? stop.age : "Unknown"}
              <br />
              Object of search: {stop.searchFor}
              <br />
              Year: {stop.year}
            </Popup>
          </Marker>
        );
      })}
    </Map>
  );
};

export default HeatMap;
