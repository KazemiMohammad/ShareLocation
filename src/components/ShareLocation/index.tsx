import React, { ChangeEvent, useState } from "react";
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import {
  AddLocation,
  EditLocation,
  LocationType,
  PlaceType,
} from "../../redux/action";
import "leaflet/dist/leaflet.css";
import { customMapMarkerIcon } from "../../utils/customMapMarketIcon";
import "./style.scss";
import { LatLngLiteral } from "leaflet";

interface iShareLocationProps {
  hideModal: VoidFunction;
}

const mapState = (state: any) => {
  return {
    selectedLocation: state.selectedLocation as LocationType,
  };
};

interface LocationMarkerPropsType {
  latLng: LatLngLiteral;
  setLatLng: any;
}
function LocationMarker(props: LocationMarkerPropsType) {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const map = useMapEvents({
    click(e) {
      props.setLatLng(e.latlng);
    },
  });

  return <Marker position={props.latLng} icon={customMapMarkerIcon} />;
}
export default function ShareLocation(props: iShareLocationProps) {
  const dispatch = useDispatch();
  const { selectedLocation } = useSelector(mapState);

  const [name, setName] = useState<string>(
    selectedLocation.name ? selectedLocation.name : ""
  );
  const [latLng, setLatLng] = useState<LatLngLiteral>({
    lat: selectedLocation.lat,
    lng: selectedLocation.lng,
  });
  const [locationType, setLocationType] = useState<PlaceType>(
    selectedLocation.type
      ? (selectedLocation.type as PlaceType)
      : PlaceType.Home
  );
  const [logo, setLogo] = useState<any>(selectedLocation.image);

  const changeSelectedFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.files && setLogo(e.target.files[0]);
  };

  const handleChangeLocationType = (e: ChangeEvent<HTMLSelectElement>) => {
    setLocationType(PlaceType[e.target.value as keyof typeof PlaceType]);
  };

  const handleShare = () => {
    let location = {
      ...latLng,
      id: selectedLocation.id,
      name: name,
      type: locationType,
      image: logo,
    } as LocationType;
    if (selectedLocation.id) {
      dispatch(EditLocation(location));
    } else {
      dispatch(AddLocation(location));
    }
    props.hideModal();
  };

  return (
    <div className="share-location-component">
      <div className="form">
        <span>Location name:</span>
        <input
          className="location-name"
          type="text"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <span>Location on map:</span>
        <MapContainer
          center={selectedLocation}
          zoom={15}
          scrollWheelZoom={false}
          className="map"
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker latLng={latLng} setLatLng={setLatLng} />
        </MapContainer>
        <span className="form-label">Location Type: </span>
        <select
          onChange={handleChangeLocationType}
          value={locationType}
          className="location-type"
        >
          {(Object.keys(PlaceType) as Array<keyof typeof PlaceType>).map(
            (key) => {
              return (
                <option key={key} value={key}>
                  {key}
                </option>
              );
            }
          )}
        </select>
        <span>Logo:</span>
        <input
          type="file"
          onChange={changeSelectedFile}
          className="logo-file-input"
        />
        <div className="btn-wrapper">
          <button
            onClick={() => {
              props.hideModal();
            }}
            className="btn"
          >
            Cancel
          </button>
          <button onClick={handleShare} className="btn default">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
