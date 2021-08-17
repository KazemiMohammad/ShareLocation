import React from "react";
import "./style.scss";
import { LocationType } from "../../redux/action";

interface locationDetailPropsType {
  location: LocationType;
  closePopup:VoidFunction;
  showShareLocationModal:VoidFunction;
}
export default function LocationDetail(props: locationDetailPropsType) {
  let location = props.location;
  const handleEdit=()=>{
      props.closePopup();
      props.showShareLocationModal();
  }
  return (
    <div className="location-detail-component">
      <div className="header">Location Details</div>
      <div className="form">
        <span>Location name:</span>
        <span>{location.name}</span>
        <span>Location Type: </span>
        <span>{location.type}</span>
        <div className="btn-wrapper">
          <button className="btn" onClick={props.closePopup}>Close</button>
          <button className="btn default" onClick={handleEdit}>Edit</button>
        </div>
      </div>
    </div>
  );
}
