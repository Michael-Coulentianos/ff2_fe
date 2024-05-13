import React, { useState, useEffect, memo } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import TextBox from "../atom/textBox";

interface MapComponentProps {
  label: string;
  id: string;
  error: boolean;
  helperText: any;
  onPositionChange: (position: { lat: number, lng: number }) => void;
}

const MapComponent: React.FC<MapComponentProps> = memo(({
  label,
  id,
  error,
  helperText,
  onPositionChange,
}) => {
  const [position, setPosition] = useState({ lat: -29.0, lng: 24.0 });
  const [address, setAddress] = useState("");

  // Try to fetch current location of the user
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      () => {
        console.log("Error getting location, using default.");
      }
    );
  }, []);

  const handleClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPosition = e.latLng.toJSON();
      setPosition(newPosition);
      onPositionChange(newPosition);
      
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ location: newPosition }, (results, status) => {
        if (status === "OK" && results && results[0]) {
          setAddress(results[0].formatted_address);
        }
      });
    }
  };

  const mapContainerStyle = {
    height: "300px",
    cursor: "crosshair"
  };

  const mapOptions = {
    disableDefaultUI: true,
    zoomControl: true,
    draggableCursor: 'crosshair'
  };

  return (
    <>
      <LoadScript googleMapsApiKey="AIzaSyAyy8BzMlKKQCPsQRgvhMW4MxfjGuIEWUc">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={position}
          zoom={10}
          options={mapOptions}
          onClick={handleClick}
          mapTypeId="satellite"
        >
          {position && <Marker position={position} />}
        </GoogleMap>
      </LoadScript>
      <TextBox
        id={id}
        label={label}
        value={address}
        onChange={() => {}}
        error={error}
        helperText={helperText}
        disabled={true}
      ></TextBox>
    </>
  );
});

export default MapComponent;
