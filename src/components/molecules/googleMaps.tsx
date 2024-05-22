import React, { useCallback, useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  Marker,
  useLoadScript,
  Libraries,
} from "@react-google-maps/api";
import GoogleMapsSearchBar from "../atom/googleMapsSearchBar";
import Loading from "../pages/loading";
import { CircularProgress } from "@mui/material";
import TextBox from "../atom/textBox";

interface Location {
  lat: number;
  lng: number;
}

const libraries: Libraries = ["places"];

const MyMapComponent: React.FC<{
  onLocationSelect: (location: Location) => void;
}> = ({ onLocationSelect }) => {
  const [currentPosition, setCurrentPosition] = useState<Location | null>(null);
  const [selectedPosition, setSelectedPosition] = useState<Location | null>(
    null
  );
  const mapRef = useRef<google.maps.Map | null>(null);
  const [suggestions, setSuggestions] = useState<
    google.maps.places.AutocompletePrediction[]
  >([]);

  const [inputValue, setInputValue] = useState("");

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

  const handleInputChange = (event, newValue) => {
    setInputValue(newValue);
    if (!autocompleteService.current || event.target.value === "") {
      setSuggestions([]);
      return;
    }
    autocompleteService.current.getPlacePredictions(
      { input: event.target.value },
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
      setSelectedSuggestion(value.description);
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
        ////convert location to string/adddress
        // const geocoder = new google.maps.Geocoder();
        //geocoder.geocode({ location }, (results, status) => {
        //   if (
        //     status === google.maps.GeocoderStatus.OK &&
        //     results &&
        //     results[0]
        //   ) {
        //     const formattedAddress = results[0].formatted_address;
        //   } else {
        //     console.error("Geocode failed:", status);
        //   }
        // });
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
        center={currentPosition || { lat: -30.559482, lng: 22.937506 }}
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
        }}
      >
        {currentPosition && <Marker position={currentPosition} />}
        {selectedPosition && <Marker position={selectedPosition} />}
      </GoogleMap>
    </div>
  );
};

export default MyMapComponent;
