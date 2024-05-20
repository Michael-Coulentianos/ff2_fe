import React, { useCallback, useState, useEffect, useRef } from 'react';
import { GoogleMap, Marker, useLoadScript, Libraries } from '@react-google-maps/api';
import GoogleMapsSearchBar from '../atom/googleMapsSearchBar';

interface Location {
  lat: number;
  lng: number;
}

const libraries: Libraries = ['places'];

const MyMapComponent: React.FC<{ onLocationSelect: (location: Location) => void }> = ({ onLocationSelect }) => {
  const [currentPosition, setCurrentPosition] = useState<Location | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Location | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: 'AIzaSyAyy8BzMlKKQCPsQRgvhMW4MxfjGuIEWUc', // Replace with your API key
    libraries,
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

  const handleAddressSelected = (address: string) => {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK && results && results[0]) {
        const location = results[0].geometry.location;
        const newLocation: Location = {
          lat: location.lat(),
          lng: location.lng(),
        };
        mapRef.current?.panTo(newLocation);
        setSelectedPosition(newLocation);
        onLocationSelect(newLocation);
      }
    });
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <div>
      <GoogleMapsSearchBar onAddressSelected={handleAddressSelected} />
      <GoogleMap
        center={currentPosition || { lat: 0, lng: 0 }}
        zoom={15}
        mapContainerStyle={{ height: '400px', width: '100%' }}
        onClick={onMapClick}
        options={{
          disableDefaultUI: true, // Disable all default UI
          zoomControl: true, // Enable zoom control
          gestureHandling: 'greedy',
          draggableCursor: 'pointer', // Change cursor to pointer
        }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        {currentPosition && <Marker position={currentPosition} />}
        {selectedPosition && <Marker position={selectedPosition} />}
      </GoogleMap>
    </div>
  );
};

export default MyMapComponent;
