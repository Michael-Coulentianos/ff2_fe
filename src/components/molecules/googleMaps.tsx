import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Libraries,
} from "@react-google-maps/api";
import GoogleMapsSearchBar from "../atom/googleMapsSearchBar";
import { CircularProgress } from "@mui/material";

interface Location {
  lat: number;
  lng: number;
}

const libraries: Libraries = ["places"];

const MyMapComponent: React.FC<{
  onLocationSelect: (location: Location) => void;
  initialLocation?: Location;
  initialAddress?: string;
}> = ({ onLocationSelect, initialLocation, initialAddress }) => {
  const [currentPosition, setCurrentPosition] = useState<Location>();
  const [selectedPosition, setSelectedPosition] = useState<Location | null>(
    initialLocation || null
  );
  const [inputValue, setInputValue] = useState("");

  const mapRef = useRef<google.maps.Map | null>(null);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  const autocompleteService =
    useRef<google.maps.places.AutocompleteService | null>(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyAyy8BzMlKKQCPsQRgvhMW4MxfjGuIEWUc",
    libraries,
  });

  const [selectedSuggestion, setSelectedSuggestion] = useState<any>();

  useEffect(() => {
    if (isLoaded && !autocompleteService.current) {
      autocompleteService.current =
        new google.maps.places.AutocompleteService();
    }
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, [isLoaded]);

  useEffect(() => {
    if (initialLocation) {
      mapRef.current?.panTo(initialLocation);
      setSelectedPosition(initialLocation);
    }

    if (initialAddress) {
      setInputValue(initialAddress);
    } else {
      setInputValue("");
    }
  }, [initialLocation, initialAddress]);

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);
    if (!autocompleteService.current || newValue === "") {
      setSuggestions([]);
      return;
    }
    autocompleteService.current.getPlacePredictions(
      { input: newValue },
      (results, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          setSuggestions(results);
        } else {
          setSuggestions([]);
        }
      }
    );
  };

  const handleSuggestionSelected = (event, value) => {
    if (value) {
      setSelectedSuggestion(value);
      const address = value.description;
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
          setInputValue(address); // Update input value
          onLocationSelect(newLocation);
        }
      });
    }
  };

  const onMapClick = useCallback(
    (event: google.maps.MapMouseEvent) => {
      if (event.latLng) {
        const location: Location = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng(),
        };
        setSelectedPosition(location);
        onLocationSelect(location);
        // Reverse geocode to get the address
        const geocoder = new google.maps.Geocoder();
        geocoder.geocode({ location }, (results, status) => {
          if (
            status === google.maps.GeocoderStatus.OK &&
            results &&
            results[0]
          ) {
            const address = results[0].formatted_address;
            setInputValue(address); // Update input value with the clicked location address
          } else {
            console.error("Geocode failed:", status);
          }
        });
      }
    },
    [onLocationSelect]
  );

  if (!isLoaded) return <CircularProgress color="primary" />;

  return (
    <div>
      <GoogleMapsSearchBar
        handleInputChange={handleInputChange}
        handleSuggestionSelected={handleSuggestionSelected}
        suggestions={suggestions}
        selectedSuggestion={selectedSuggestion}
        inputValue={inputValue}
      />
      <GoogleMap
        center={
          initialLocation !== undefined ? initialLocation : currentPosition
        }
        zoom={15}
        mapContainerStyle={{ height: "200px", width: "535px" }}
        onClick={onMapClick}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: "greedy",
          draggableCursor: "pointer",
        }}
        onLoad={(map) => {
          mapRef.current = map;
          if (initialLocation) {
            map.panTo(initialLocation);
          }
        }}
      >
        {selectedPosition && <Marker position={selectedPosition} />}
      </GoogleMap>
    </div>
  );
};

export default MyMapComponent;
