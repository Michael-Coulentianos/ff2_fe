import React, { useCallback, useRef, useState, useEffect } from 'react';
import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';

interface Location {
  lat: number;
  lng: number;
}

const MyMapComponent = ({ onLocationSelect }) => {
  const [currentPosition, setCurrentPosition] = useState<Location | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Location | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAyy8BzMlKKQCPsQRgvhMW4MxfjGuIEWUc', 
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const location: Location = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
      };
      setSelectedPosition(location);
      onLocationSelect(location);
    }
  }, [onLocationSelect]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      center={currentPosition || { lat: 0, lng: 0 }}
      zoom={15}
      mapContainerStyle={{ height: '400px', width: '100%' }}
      onClick={onMapClick}
    >
      {currentPosition && <Marker position={currentPosition} />}
      {selectedPosition && <Marker position={selectedPosition} />}
    </GoogleMap>
  );
};

export default MyMapComponent;