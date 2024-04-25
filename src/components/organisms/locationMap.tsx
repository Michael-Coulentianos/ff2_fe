import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import TextBox from "../atom/textBox";

interface MapComponentProps {
  label: string;
  error: boolean;
  helperText: any;
}
const MapComponent: React.FC<MapComponentProps> = ({
  label,
  error,
  helperText,
}) => {
  const [position, setPosition] = useState({ lat: -29.0, lng: 24.0 });
  const [address, setAddress] = useState("");

  const handleClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition = e.latLng.toJSON();
      setPosition(newPosition);
      // Save the location data
      console.log(newPosition);
      // Convert the position to an address
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newPosition }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          setAddress(results[0].formatted_address);
        }
      });
    }
  };

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyAyy8BzMlKKQCPsQRgvhMW4MxfjGuIEWUc">
        <GoogleMap
          mapContainerStyle={{ height: "200px", width: "400px" }}
          center={position}
          zoom={10}
          onClick={handleClick}
        >
          {position && <Marker position={position} />}
        </GoogleMap>
      </LoadScript>
      <TextBox
        label={label}
        value={address}
        onChange={undefined}
        error={error}
        helperText={helperText}
        disabled
      ></TextBox>
    </>
  );
};

export default MapComponent;