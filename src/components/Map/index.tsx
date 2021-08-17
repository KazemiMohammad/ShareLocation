import React, { useEffect } from "react";
import L, { LatLngLiteral } from "leaflet";
import { Marker, Popup, useMapEvents } from "react-leaflet";
import { MapContainer, TileLayer } from "react-leaflet";
import { useSelector, useDispatch } from "react-redux";
import {
  LocationType,
  PlaceType,
  SetSelectedLocation,
} from "../../redux/action";
import "leaflet/dist/leaflet.css";
import { customMapMarkerIcon } from "../../utils/customMapMarketIcon";
import LocationDetail from "../LocationDetail";

const mapState = (state: any) => {
  return {
    locations: state.locations,
    selectedLocation: state.selectedLocation,
  };
};

function LocationMarker(props: any) {
  const { locations } = useSelector(mapState);
  const map = useMapEvents({
    click(e) {
      let location: LocationType = {
        ...e.latlng,
      } as LocationType;
      props.showShareLocationModal(location);
    },
  });

  useEffect(() => {
    if (locations.length) {
      let center: L.LatLngLiteral = map.getCenter();
      let firstLocationPoint: L.LatLngLiteral = {
        lat: locations[locations.length - 1].lat,
        lng: locations[locations.length - 1].lng,
      };
      if (center !== firstLocationPoint) {
        map.flyTo(firstLocationPoint);
      }
    }
  }, [locations, map]);

  if (locations.length) {
    return locations.map((item: any) => {
      return (
        <Marker
          key={item.id}
          position={[item.lat, item.lng]}
          icon={customMapMarkerIcon}
        >
          <Popup>
            <LocationDetail
              location={item}
              closePopup={() => {
                map.closePopup();
              }}
              showShareLocationModal={() => props.showShareLocationModal(item)}
            />
          </Popup>
        </Marker>
      );
    });
  }

  return null;
}

export default function Map(props: any) {
  const dispatch = useDispatch();
  const { selectedLocation } = useSelector(mapState);
  const { locations } = useSelector(mapState);

  const showShareLocationModal = (Location: LocationType) => {
    dispatch(SetSelectedLocation(Location));
    props.toggle();
  };

  let center: LatLngLiteral = locations.length
    ? { lat: locations[0].lat, lng: locations[0].lng }
    : selectedLocation;

  return (
    <div className="app">
      <MapContainer
        center={center}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100vh", width: "100vw" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker showShareLocationModal={showShareLocationModal} />
      </MapContainer>
    </div>
  );
}
